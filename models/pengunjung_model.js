const joi = require('joi');

const getCreatePengunjungModel = function() {
    const model = joi.object({
        usernamePengunjung: joi.string().required(),
        passwordPengunjung: joi.string().required(),
        namaPengunjung: joi.string().required(),
        nikPengunjung: joi.string().required(),
        alamatPengunjung: joi.string().required(),
        noHpPengunjung: joi.string().required(),
        umurPengunjung: joi.number().required(),
        jenisKelaminPengunjung: joi.string().valid('Pria', 'Wanita').required(),
        statusKesehatan: joi.string().valid('Negatif', 'Positif', 'ODP', 'OTG').required()
    });
    return model;
}

const getUpdatePengunjungModel = function() {
    const model = joi.object({
        usernamePengunjung: joi.string().required(),
        passwordPengunjung: joi.string().required(),
        namaPengunjung: joi.string().required(),
        nikPengunjung: joi.string().required(),
        alamatPengunjung: joi.string().required(),
        noHpPengunjung: joi.string().required(),
        umurPengunjung: joi.number().required(),
        jenisKelaminPengunjung: joi.string().valid('Pria', 'Wanita').required(),
        statusKesehatan: joi.string().valid('Negatif', 'Positif', 'ODP', 'OTG').required()
    });
    return model;
}

module.exports = {
    getCreatePengunjungModel: getCreatePengunjungModel,
    getUpdatePengunjungModel: getUpdatePengunjungModel
}