//parsing function for /create-model

//function to check if the input is empty
const parseModelFileName = (obj) => {
    if(!obj['fileName'] || obj['fileName'].trim() === '') {
        throw { statuscode: 400, message: 'modelName field is required' };
    }
    return obj;
};

//function to check if the model field is valid
const parseModelName = (obj) => {
    if(obj['modelName'] !== "mistral" && obj['modelName'] !== "llama2" && obj['modelName'] !== "codellama" && obj['modelName'] !== "dolphin-mixtral") {
        throw { statuscode: 400, message: 'modelName field must be mistral, llama2, codellama or dolphin-mixtral' };
    };
    if(!obj['modelName'] || obj['modelName'].trim() === '') {
        throw { statuscode: 400, message: 'modelName field is required' };
    };
    return obj;
};

//function to check if the temperature field is valid
const parseModelParameterTemperature = (obj) => {
    if (obj['temperature'] === undefined || obj['temperature'] === null) {
        throw { statuscode: 400, message: 'temperature field is required' };
    }
    
    const temperatureValue = parseFloat(obj['temperature']);

    if (isNaN(temperatureValue)) {
        throw { statuscode: 400, message: 'temperature field must be a number' };
    }

    return obj;
};

//function to check if the num_ctx field is valid
const parseModelParameterNum_ctx = (obj) => {
    if(!obj['num_ctx'] || obj['num_ctx'] === '') {
        throw { statuscode: 400, message: 'num_ctx field is required' };
    };
    if(isNaN(obj['num_ctx'])) {
        throw { statuscode: 400, message: 'num_ctx field must be a number' };
    }
    return obj;
};

//function to check if the system field is valid
const parseModelSystem = (obj) => {
    if(!obj['system'] || obj['system'].trim() === '') {
        throw { statuscode: 400, message: 'system field is required' };
    };
    return obj;
};

//function to check if the microstat field is valid
const parseModelMicrostat = (obj) => {
    // default 0 = disabled, 1 = mirostat, 2 mirostat 2.0
    if (obj['microstat'] !== 0 && obj['microstat'] !== 1 && obj['microstat'] !== 2 && obj['microstat'] !== undefined) {
        throw { statuscode: 400, message: 'microstat field must be 0 = disabled, 1 = Mirostat or 2 = Mirostat 2.0' };
    }
    return obj;
};

//function to check if the microstat_eta field is valid
const parseModelMicrostat_eta = (obj) => {
    if (obj['microstat_eta'] !== undefined && isNaN(obj['microstat_eta'])) {
        throw { statuscode: 400, message: 'microstat_eta field must be a number, the default is 0.1' };
    }
    return obj;
};

//function to check if the microstat_tau field is valid
const parseModelMicrostat_tau = (obj) => {
    if (obj['microstat_tau'] !== undefined && isNaN(obj['microstat_tau'])) {
        throw { statuscode: 400, message: 'mirostat_tau field must be a number, the default is 5.0' };
    }
    return obj;
};

//function to check if the num_gpa field is valid
const parseModelNum_gpa = (obj) => {
    if (obj['num_gpa'] !== undefined && isNaN(obj['num_gpa'])) {
        throw { statuscode: 400, message: 'num_gpa field must be a number' };
    }
    return obj;
};

//function to check if the num_gpu field is valid
const parseModelNum_gpu = (obj) => {
    if (obj['num_gpu'] !== undefined && isNaN(obj['num_gpu'])) {
        throw { statuscode: 400, message: 'num_gpu field must be a number' };
    }
    return obj;
};

//function to check if the num_thread field is valid
const parseModelNum_thread = (obj) => {
    if (obj['num_thread'] !== undefined && isNaN(obj['num_thread'])) {
        throw { statuscode: 400, message: 'num_thread field must be a number' };
    }
    return obj;
};

//function to check if the repeat_last_n field is valid
const ParseModelRepeat_last_n = (obj) => {
    // default 64, 0 = disabled, -1 = num_ctx
    if (obj['repeat_last_n'] !== 64 && obj['repeat_last_n'] !== 0 && obj['repeat_last_n'] !== -1 && obj['repeat_last_n'] !== undefined) {
        throw { statuscode: 400, message: 'microstat field must be: 64 = default, 0 = disabled or -1 = num_ctx' };
    }
    return obj;
};

//function to check if the repeat_penalty field is valid
const ParseModelRepeat_penalty = (obj) => {
    if (obj['repeat_penalty'] !== undefined && isNaN(obj['repeat_penalty'])) {
        throw { statuscode: 400, message: 'repeat_penalty field must be a number, the default is 1.1' };
    }
    return obj;
};

//function to check if the seed field is valid
const ParseModelSeed = (obj) => {
    if (obj['seed'] !== undefined && isNaN(obj['seed'])) {
        throw { statuscode: 400, message: 'seed field must be a number, default = 0' };
    }
    return obj;
};

//function to check if the stop field is valid
const ParseModelStop = (obj) => {
    if (obj['stop'] !== undefined && isNaN(obj['stop'])) {
        throw { statuscode: 400, message: 'stop field must be a number, default = 0' };
    }
    return obj;
};

//function to check if the tfs_z field is valid
const ParseModelTfs_z = (obj) => {
    if (obj['tfs_z'] !== undefined && isNaN(obj['tfs_z'])) {
        throw { statuscode: 400, message: 'tfs_z field must be a float, default = 1.0' };
    }
    return obj;
};

//function to check if the num_predict field is valid
const ParseModelNum_predict = (obj) => {
    // default 128, -1 = infinite generation, -2 = fill context
    if (obj['num_predict'] !== 128 && obj['num_predict'] !== -1 && obj['num_predict'] !== -2 && obj['num_predict'] !== undefined) {
        throw { statuscode: 400, message: 'microstat field must be: 128 = default, -1 = infinite generation or -2 = fill context' };
    }
    return obj;
};

//function to check if the top_k field is valid
const ParseModelTop_k = (obj) => {
    if (obj['top_k'] !== undefined && isNaN(obj['top_k'])) {
        throw { statuscode: 400, message: 'top_k field must be a number, default = 0' };
    }
    return obj;
};

//function to check if the top_p field is valid
const ParseModelTop_p = (obj) => {
    if (obj['top_p'] !== undefined && isNaN(obj['top_p'])) {
        throw { statuscode: 400, message: 'top_p field must be a number, default = 0' };
    }
    return obj;
};

//function to parse the input
const parsingModel = (obj) => {
    //function to parse the /create-model route
    parseModelFileName(obj);
    parseModelName(obj);
    parseModelParameterTemperature(obj);
    parseModelParameterNum_ctx(obj);
    parseModelSystem(obj);
    parseModelMicrostat(obj);
    parseModelMicrostat_eta(obj);
    parseModelMicrostat_tau(obj);
    parseModelNum_gpa(obj);
    parseModelNum_gpu(obj);
    parseModelNum_thread(obj);
    ParseModelRepeat_last_n(obj);
    ParseModelRepeat_penalty(obj);
    ParseModelSeed(obj);
    ParseModelStop(obj);
    ParseModelTfs_z(obj);
    ParseModelNum_predict(obj);
    ParseModelTop_k(obj);
    ParseModelTop_p(obj);
    return obj;
}

module.exports = { parsingModel };