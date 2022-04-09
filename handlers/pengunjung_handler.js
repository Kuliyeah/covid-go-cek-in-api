const response = require('../responses/responses');

class PengunjungHandler {
    constructor(service) {
        this.service = service;
    }

    async getOnePengunjung(req, res) {
        try {
            const result = await this.service.getOnePengunjung(req.params.id);
            response.success(res, 200, 'OK', 'detail of an pengunjung', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async getManyPengunjung(req, res) {
        try {
            const result = await this.service.getManyPengunjung();
            response.success(res, 200, 'OK', 'all data of pengunjung', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async createPengunjung(req, res) {
        try {
            const result = await this.service.createPengunjung(req.body);
            response.success(res, 201, 'CREATED', 'pengunjung data has successfuly created', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async updatePengunjung(req, res) {
        const id = req.params.id;
        const update = req.body;

        try {
            const result = await this.service.updatePengunjung(id, update);
            response.success(res, 200, 'MODIFIED', 'an pengunjung data has successfuly modified', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }
}

module.exports = PengunjungHandler;