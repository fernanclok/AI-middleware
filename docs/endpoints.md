# Endpoints

The project uses 3 different endpoints to function, which are.

```bash
/ai
```

This endpoint allows you to send the request to intelligence to process the message.

The request must be in JSON format and must comply with the following format to be accepted

```bash
{
  "model": "llama2", //name of the model you want to use
  "prompt":"why the sky is blue?", //the message you want to send
	"stream": false // this help to reduce the AI response to a single JSON object
}
```

Once the request is sent, an ID will be returned which you will use to consult your result.
You will receive a response like this.

```bash
{
	"message": "262d7199-63e8-44b3-a341-aee21e779cad"
}
```

The next endpoint is

```bash
/ai/result/:id
```

The endpoint returs your response to the request you send.

All you need to request your result is add your id to the slug like this

```bash
/ai/result/262d7199-63e8-44b3-a341-aee21e779cad
```

this return your response

```bash
{
	"model": "clarity_1",
	"prompt": "why the sky is blue?",
	"result": " the sky is blue because ....",
	"timestamp": "2023-12-29T23:59:50.831Z",
	"uniqueId": "262d7199-63e8-44b3-a341-aee21e779cad"
}
```

the las endpoint allow you to create a custom model.

If you want to create a custom model see the instruction to create the model here:

[Create custom model](create_custom_model.md)

The next endpoint is

```bash
/ai/speech-to-text
```

this endopoin allow the user convert an audio file to text

to use this endpoint you need send the audio file and the header multipart/form-data

here’s an example:

![Untitled](docs/images_doc/Untitled.png)

with that endpoint your response is your audio file into text.

[⬅️ Getting Started](getting_started.md)                                    [Main page](/readme.md)                                   [Create custom Model ➡️](create_custom_model.md)
