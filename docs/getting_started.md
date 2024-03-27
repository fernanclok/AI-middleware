# Getting Started

To run the projects in your own machine you need to setup the next things:

1. install Ollama (in case of you already installed Ollama skip this step)

[Ollama](https://ollama.ai/)

**Check that the commands presented below are up to date. If not, consult the official website.**

- Linux & WSL2

```bash
curl https://ollama.ai/install.sh | sh
```

- macOS

```bash
https://ollama.ai/download/Ollama-darwin.zip
```

- Windows

```bash
Coming soon! For now, you can install Ollama on Windows via WSL2.
```

1. Open a terminal and run the next command to run and chat with a model

```bash
ollama run llama2
```

Once you have run the command and the model has been downloaded you will be able to chat with him. you can repeat the command with the models you want to use. There is no need to open a new terminal for each model, just wait for the model to be downloaded, use ctrl + c and run the command with the new model.

1. Now clone the github repository
2. enter to the project

```bash
cd AI-middleware
```

1. open a terminal and run the next command

```bash
npm install
```

1. finally run npm run start:prod 

```bash
npm run start:prod
```

Now you are ready to start using the AI-middleware

[⬅️ Back](/readme.md)                                                      [Main page](/readme.md)                                                     [Endpoints ➡️](endpoints.md)