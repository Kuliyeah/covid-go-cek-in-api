const response = require('../responses/responses');

class MitraHandler {
    constructor(service) {
        this.service = service;
    }

    async getOneMitra(req, res) {
        try {
            const result = await this.service.getOneMitra(req.params.id);
            response.success(res, 200, 'OK', 'detail of an mitra', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async getMitraByNama(req, res) {
        try {
            const result = await this.service.getMitraByNama(req.params.nama);
            response.success(res, 200, 'OK', 'detail of an mitra', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async getManyMitra(req, res) {
        try {
            const result = await this.service.getManyMitra();
            response.success(res, 200, 'OK', 'all data of mitra', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }
}

module.exports = MitraHandler;