const response = require('../responses/responses');

class PengunjungHandler {
    constructor(service) {
        this.service = service;
    }

    async getOnePengunjung(req, res) {
        try {
            const result = await this.service.getOnePengunjung(req.params.id);
            response.success(res, 200, 'OK', 'detail of an Pengunjung', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async getManyPengunjung(req, res) {
        try {
            const result = await this.service.getManyPengunjung();
            response.success(res, 200, 'OK', 'bunch of Pengunjungs', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }
}

module.exports = PengunjungHandler;