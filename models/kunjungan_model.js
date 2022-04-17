const joi = require('joi');

const getCreateKunjunganModel = function() {
    const model = joi.object({
        idPengunjung: joi.number().required(),
        idMitra: joi.number().required(),
        tanggal: joi.string().required(),
        checkin: joi.string().required(),
        checkout: joi.string().required(),
        statusKunjungan: joi.string().valid('Selesai', 'Dalam Kunjungan').required(),
    });
    return model;
}

module.exports = {
    getCreateKunjunganModel: getCreateKunjunganModel
}