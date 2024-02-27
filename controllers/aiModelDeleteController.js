const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');
const redisClient = require("../redis/redisClient");

// Controller to delete a model
const deleteModelController = async (req, res) => {
  const modelName = req.params.modelId; 

  try {
    // Verifiy in redis if the model exist in the list
    const modelExists = await redisClient.sismember('existingModelNames', modelName);

    // If the model exists execute the commands
    if (modelExists) {
      // Execute the command to delete the model
      await ejecutarComando(`ollama rm ${modelName}`);

      // Delete the model name from the list in redis
      await redisClient.srem('existingModelNames', modelName);

      // Delete the model from the folder
      eliminarArchivo(path.join(__dirname, "/ai-models/", modelName));

      // Send the a message of success to the client 
      res.status(200).json({
        message: `Model ${modelName} deleted successfully`,
      });
    } else {
      // The model doesn't exist in redis
      res.status(404).json({
        message: "Model not found",
      });
    }
  } catch (error) {
    // If there is an error, send a message to the client
    console.error('Error at the moment of deleting:', error);
    res.status(500).json({ Message: "Something went wrong: " + error.message }).send();
  }

  // Function to delete the file
  function eliminarArchivo(filePath) {
    try {
      // verify the file exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted:', filePath);
      }
    } catch (error) {
      console.error('Error deleting the file:', error);
    }
  }

  // Function to execute the commands
  async function ejecutarComando(command) {
    try {
      const { stdout, stderr } = await exec(command);
    } catch (error) {
      console.error('Error ejecuting the command:', error);
      throw error;
    }
  }
};

module.exports = deleteModelController;