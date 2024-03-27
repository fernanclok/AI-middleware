const regex = /^[a-zA-Z0-9._,/?() -]*$/;

//function to check if the input is empty
const checkEmptyInput = (obj) => {
    if(!Object.keys(obj).length) {
        throw { statuscode: 400, message: 'Empty input' };
    }
    return obj;
}

//function to check if the model field is valid
const parseModelField = (obj) => {
    if(!regex.test(obj.model)) {
        throw { statuscode: 400, message: 'model field does not match the allowed pattern' };
    };
    if(!obj['model'] || obj['model'].trim() === '') {
        throw { statuscode: 400, message: 'model field is required' };
    };
    return obj;
}

//function to check if the prompt field is valid
const parsePromptField = (obj) => {
    if(!obj['prompt'] || obj['prompt'].trim() === '') {
        throw { statuscode: 400, message: 'prompt field is required' };
    };
    return obj;
};

//function to parse the input
const parsing = (obj) => {
    checkEmptyInput(obj);
    parseModelField(obj);
    parsePromptField(obj);
    return obj;
}

module.exports = { parsing };