const response = require('../responses/responses');

class KunjunganHandler {
    constructor(service) {
        this.service = service;
    }

    async getKunjunganByIDPengunjung(req, res) {
        try {
            const result = await this.service.getKunjunganByIDPengunjung(req.params.id);
            response.success(res, 200, 'OK', 'detail of an kunjungan', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async createKunjungan(req, res) {
        try {
            const result = await this.service.createKunjungan(req.body);
            response.success(res, 201, 'CREATED', 'kunjungan data has successfuly created', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }
}

module.exports = KunjunganHandler;