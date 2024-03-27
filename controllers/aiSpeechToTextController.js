const axios = require('axios');
const logger = require('../helpers/logger');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/:/g, '-'); // replace ':' with '-' to avoid issues with file paths
    const filename = path.parse(file.originalname).name; // get the file name without the extension
    const extension = path.parse(file.originalname).ext; // get the file extension
    const newFilename = `${filename}_${formattedDate}${extension}`;
    cb(null, newFilename);
  }
})

const upload = multer({ storage: storage });

// Controller to convert speech to text
const aiSpeechToTextController = async (req, res) => {
  upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'format', maxCount: 1 }])(req, res, async (err) => {
    if (err) {
      // Log the error
      logger.error('An error occurred: ', err);

      // Send a 500 response
      return res.status(500).json({
        message: 'An error occurred',
        error: err.message,
      });
    }

    try {
      // Log the request body
      logger.info('=================');
      logger.info('Request files: ', { audio: req.files['audio'], format: req.body.format });

      // Log the request body
      logger.info('Request parsed successfully');
      logger.info('POST /ai/speech-to-text', { audio: req.files['audio'], format: req.body.format });

      const formData = new FormData();
      formData.append('format', req.body.format);
      
      // Add the audio file to FormData
      const audioFilePath = req.files['audio'][0].path;
      const audioFileStream = fs.createReadStream(audioFilePath);
      formData.append('audio', audioFileStream);

      // send the file to the ai service
      const response = await axios.post('http://localhost:8001/transcribe', formData, {
        headers: {
          ...formData.getHeaders() // Add appropriate headers
        }
      });

      // Send the message
      res.status(200).json({
        message: 'Speech converted to text',
        data: response.data
      });
    } catch (error) {
      // Log the error
      logger.error('An error occurred: ', error);

      // Send a 500 response
      res.status(500).json({
        message: 'An error occurred',
        error: error.message,
      });
    }
  });
}

module.exports = aiSpeechToTextController;