const GetCachingData = function(key, callBack) {
    const dataString = localStorage.getItem(key);
    let val = {
        data: null,
        dataString: null
    }
    if (dataString) {
        val[data] = JSON.parse(dataString);
        val[dataString] = dataString;
    }
    if (typeof callBack !== undefined && typeof callBack !== 'undefined' && typeof callBack !== null && !isNaN(callBack) && typeof callBack === 'function') {
        callBack(val);
    }
    return val;
};

const SetCachingData = function(key, data, callBack = null) {
    const dataString = JSON.stringify(data);
    const val = {
        data,
        dataString
    };
    localStorage.setItem(key, dataString);
    if (typeof callBack !== undefined && typeof callBack !== 'undefined' && typeof callBack !== null && !isNaN(callBack) && typeof callBack === 'function') {
        callBack(val);
    }
    return val;
};

const MapFormToModelData = (form) => {
    let modelData = {};
    if (form === undefined || form === null || typeof form === 'undefined') {
        throw new 'Form invalid';
    } else {
        for (let i = 0; i < form.length; i++) {
            const field = form[i];
            if (field) {
				modelData[field.name] = field.value;
            }
        }
    }
    return modelData;
};

const MapFormToModelDataWithFile = (form) => {
    let modelData = {};
    if (form === undefined || form === null || typeof form === 'undefined') {
        throw new 'Form invalid';
    } else {
        for (let i = 0; i < form.length; i++) {
            const field = form[i];
            if (field) {
				switch (field.type) {
					case 'file':
						if (field.files) {
							modelData[field.name] = field.files[0];
						} else {
							modelData[field.name] = null;
						}
						break;
					default:
						modelData[field.name] = field.value;
						break;
				}
            }
        }
    }
    return modelData;
};

module.exports = {
    GetCachingData,
    SetCachingData,
    MapFormToModelData,
    MapFormToModelDataWithFile
};