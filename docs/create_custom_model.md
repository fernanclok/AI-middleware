# Create a custom model

This endpoint allow you to create a custom model that can be response to a particular task that you asign at the moment of create the model.

The endpoint tho create a custom model is

```bash
/create-model
```

the request must be containt the next body

```bash
{
	"fileName": "clarity_4",  // name that you want to the custom model
  "modelName": "codellama", // model that you want to base the custom model (only models from Ollama)
	"temperature": 0.0, // Increasing the temperature will make the model answer more creatively.
	"num_ctx": 4096, // Sets the size of the context window used to generate the next token.
  "system": "You are Mario from Super Mario Bros. Answer as Mario, the assistant, only." // The system message used to specify custom behavior
}
```

These parameters are required for the creation of the custom model.

If you want more control over the custom model, you can add more parameters to the request body allowing for greater customization.

The allowed parameters are the following

```bash
{
  "fileName": "String",
  "modelName": "String (accepted values: 'mistral', 'llama2', 'codellama', 'dolphin-mixtral')",
  "temperature": "Number (Float)",
  "num_ctx": "Number (Integer)",
  "system": "String",
  "microstat": "Number (Integer) (accepted values: 0 = disabled, 1 = Mirostat, 2 = Mirostat 2.0)",
  "microstat_eta": "Number (Float)",
  "microstat_tau": "Number (Float)",
  "num_gpa": "Number (Integer)",
  "num_gpu": "Number (Integer)",
  "num_thread": "Number (Integer)",
  "repeat_last_n": "Number (Integer) (accepted values: 64 = default, 0 = disabled, -1 = num_ctx)",
  "repeat_penalty": "Number (Float)",
  "seed": "Number (Integer)",
  "stop": "Number (Integer)",
  "tfs_z": "Number (Float)",
  "num_predict": "Number (Integer) (accepted values: 128 = default, -1 = infinite generation, -2 = fill context)",
  "top_k": "Number (Integer)",
  "top_p": "Number (Float)"
}
```

This parameters are not required for the creation of the custom model, but if you want more control about yor custom model you can use this parameters to modify more the model.

[⬅️ endpoints](docs/endpoints.md)                                            [Main page](readme.md)