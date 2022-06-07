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

    async getOnePengunjungByUsername(req, res) {
        try {
            const result = await this.service.getOnePengunjungByUsername(req.params.username);
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

    async updatePengunjungNama(req, res) {
        const username = req.params.username;
        const update = req.body;

        try {
            const result = await this.service.updatePengunjungNama(username, update);
            response.success(res, 200, 'MODIFIED', 'an nama pengunjung data has successfuly modified', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async updatePengunjungTelp(req, res) {
        const username = req.params.username;
        const update = req.body;

        try {
            const result = await this.service.updatePengunjungTelp(username, update);
            response.success(res, 200, 'MODIFIED', 'an telp pengunjung data has successfuly modified', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async updatePengunjungAlamat(req, res) {
        const username = req.params.username;
        const update = req.body;

        try {
            const result = await this.service.updatePengunjungAlamat(username, update);
            response.success(res, 200, 'MODIFIED', 'an alamat pengunjung data has successfuly modified', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }

    async updatePassword(req, res) {
        const username = req.params.username;
        const update = req.body;

        try {
            const result = await this.service.updatePassword(username, update);
            response.success(res, 200, 'MODIFIED', 'an password pengunjung data has successfuly modified', result, null);
        } catch (err) {
            response.error(res, err);
        }
    }
}

module.exports = PengunjungHandler;