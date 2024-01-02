const logger = require("../helpers/logger");
const { parsingModel } = require("../helpers/parsingModels");
const redisClient = require("../redis/redisClient");
const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

// Controller to create a model
const aiModelController = async (req, res) => {
  // Variable to store the parsed data
  let data;

  try {
    // Log the request body
    logger.info("=================");
    logger.info("JSON request body: ", { messageBody: req.body });
    const contentType = req.headers["content-type"];

    // Verify the content-type
    if (!contentType || contentType !== "application/json") {
      throw {
        statuscode: 400,
        message: "Content-type is not application/json",
      };
    }

    // Parse the request body
    data = parsingModel(req.body, res);
    logger.info("JSON parsed successfully");
    logger.info("POST /ai", { messageBody: data });

    // Verifiy in redis if the model name exist in the list
    const modelExists = await redisClient.sismember('existingModelNames', data.fileName);

    // If the model doesn't exist in redis, create the file
    if (!modelExists) {
      // Format the data according to a template
      const contenidoFormateado = formatData(data);

      // Generate the file
      generateFile(data, contenidoFormateado);

      // Add the model name to the list in redis
      await redisClient.sadd('existingModelNames', data.fileName);

      // execute the commands
      await executeCommands(data);

      // Send the name of the model created
      res.status(200).json({
        message: "Model created, creation may take 3 minutes, model name: " + data.fileName,
      });
    } else {
      // The model name already exists in redis and the file can't be created
      res.status(400).json({
        message: "A model with the same fileName already exists, the model was not created, please try again with a different fileName",
      });
    }
  } catch (error) {

    // if the file was created, delete it
    if (data && data.fileName) {
      const filePath = path.join(__dirname, "/ai-models/", data.fileName);
      deleteFile(filePath);
    }

    // If there is an error, send a message to the client
    logger.error(error);
    res
      .status(500)
      .json({ Message: "Something went wrong: " + error.message })
      .send();
  }

  // function to format the data according to a template
  function formatData(data) {
    const { modelName, temperature, num_ctx, system, fileName, ...customParams } = data;
    let template = `
FROM ${data.modelName}

# sets the temperature to 1 [higher is more creative, lower is more coherent]
PARAMETER temperature ${data.temperature}
# sets the context window size to 4096, this controls how many tokens the LLM can use as context to generate the next token
PARAMETER num_ctx ${data.num_ctx}
# sets a custom system prompt to specify the behavior of the chat assistant
SYSTEM """ ${data.system}"""
    `;
    // add the custom parameters
    Object.keys(customParams).forEach(param => {
      template += `\nPARAMETER ${param} ${customParams[param]}`;
    });
    return template;
  }

  // function to generate the file
  function generateFile(data, contenido) {
    const directorio = path.join(__dirname, "/ai-models/");
    if (!fs.existsSync(directorio)) {
      fs.mkdirSync(directorio);
    }
    fs.writeFileSync(path.join(directorio, data.fileName), contenido);
  }

  // function to execute the commands
  async function executeCommands(data) {
    try {
      const filePath = path.join(__dirname, "/ai-models/", data.fileName);
  
      // excute the first command with a timeout of 4 minutes
      await executeCommandWithTimeout(`ollama create ${data.fileName} -f ${filePath}`, 4 * 60 * 1000);
  
      // execute the second command
      await executeCommand(`ollama run ${data.fileName}`);
  
      console.log('Commands executed correctly.');
    } catch (error) {
      // If there is an error, send a message
      console.error('Error executing the commands:', error);
      throw error;
    }
  }
  
  // function to execute a command without timeout
  async function executeCommand(command) {
    const { stdout, stderr } = await exec(command);
  }
  
  // function to execute a command with timeout
  async function executeCommandWithTimeout(command, timeout) {
    let timeoutId;
  
    try {
      // execute the command and wait for it to finish or timeout
      const result = await Promise.race([
        ejecutarComando(command),
        new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Timeout was reached')), timeout);
        }),
      ]);
  
      return result;
    } finally {
      // clear the timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  // Function to delete the file if it was created and there is an error
  function deleteFile(filePath) {
    try {
      // verify the file exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted:', filePath);
      }
    } catch (err) {
      console.error('Error deleting the file:', err);
    }
  }
};

module.exports = aiModelController;
