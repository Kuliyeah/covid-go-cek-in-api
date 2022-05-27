const Joi = require('joi');
const SQLNoRow = require('../exceptions/sql_no_row');
const NotFoundError = require('../exceptions/not_found_error');
const InternalServerError = require('../exceptions/internal_server_error');
const BadRequest = require('../exceptions/bad_request');
const PengunjungModel = require('../models/pengunjung_model');

class PengunjungService {
    constructor(promiseMysqlPool) {
        this.dbPool = promiseMysqlPool;
    }

    async getOnePengunjung(id) {
        try {
            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('SELECT * FROM pengunjung WHERE idPengunjung = ?', [id]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            connection.release();

            return queryResult[0][0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }

    async getManyPengunjung() {
        try {
            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('SELECT * FROM pengunjung ORDER BY idPengunjung DESC');
            if (queryResult[0].length < 1) throw new NotFoundError('pengunjung data is not found');

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }

    async getOnePengunjungByUsername(username) {
        try {
            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('SELECT * FROM pengunjung WHERE usernamePengunjung = ?', [username]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            connection.release();

            return queryResult[0][0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }

    async createPengunjung(params) {
        try {
            await PengunjungModel.getCreatePengunjungModel().validateAsync(params);

            const pengunjung = {
                usernamePengunjung: params.usernamePengunjung,
                passwordPengunjung: params.passwordPengunjung,
                namaPengunjung: params.namaPengunjung,
                nikPengunjung: params.nikPengunjung,
                alamatPengunjung: params.alamatPengunjung,
                noHpPengunjung: params.noHpPengunjung,
                umurPengunjung: params.umurPengunjung,
                jenisKelaminPengunjung: params.jenisKelaminPengunjung,
                statusKesehatan: params.statusKesehatan
            };

            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('INSERT INTO pengunjung SET usernamePengunjung = ?,passwordPengunjung = ?, namaPengunjung = ?, nikPengunjung = ?, alamatPengunjung = ?, noHpPengunjung = ?, umurPengunjung = ?, jenisKelaminPengunjung = ?, statusKesehatan = ?', [
                pengunjung.usernamePengunjung, pengunjung.passwordPengunjung, pengunjung.namaPengunjung, pengunjung.nikPengunjung, pengunjung.alamatPengunjung, pengunjung.noHpPengunjung, pengunjung.umurPengunjung, pengunjung.jenisKelaminPengunjung, pengunjung.statusKesehatan
            ]);

            connection.release();

            return queryResult[0];

        } catch (err) {
            console.error(err.message);

            if (err instanceof Joi.ValidationError) throw new BadRequest(err.message);
            throw new InternalServerError('an error occurred while getting pengunjung');
        }
    }

    async updatePengunjung(id, params) {
        await PengunjungModel.getUpdatePengunjungModel().validateAsync(params);

        const pengunjung = {
            usernamePengunjung: params.usernamePengunjung,
            passwordPengunjung: params.passwordPengunjung,
            namaPengunjung: params.namaPengunjung,
            nikPengunjung: params.nikPengunjung,
            alamatPengunjung: params.alamatPengunjung,
            noHpPengunjung: params.noHpPengunjung,
            umurPengunjung: params.umurPengunjung,
            jenisKelaminPengunjung: params.jenisKelaminPengunjung,
            statusKesehatan: params.statusKesehatan
        };

        try {
            const connection = await this.dbPool.getConnection();

            let queryResult = await connection.execute('SELECT idPengunjung FROM pengunjung WHERE idPengunjung = ?', [id]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            queryResult = await connection.execute('UPDATE pengunjung SET usernamePengunjung = ?,passwordPengunjung = ?, namaPengunjung = ?, nikPengunjung = ?, alamatPengunjung = ?, noHpPengunjung = ?, umurPengunjung = ?, jenisKelaminPengunjung = ?, statusKesehatan = ? WHERE idPengunjung = ?', [
                pengunjung.usernamePengunjung, pengunjung.passwordPengunjung, pengunjung.namaPengunjung, pengunjung.nikPengunjung, pengunjung.alamatPengunjung, pengunjung.noHpPengunjung, pengunjung.umurPengunjung, pengunjung.jenisKelaminPengunjung, pengunjung.statusKesehatan, id
            ]);

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }

    async updatePengunjungNama(username, params) {
        const pengunjung = {
            namaPengunjung: params.namaPengunjung,
        };

        try {
            const connection = await this.dbPool.getConnection();

            let queryResult = await connection.execute('SELECT usernamePengunjung FROM pengunjung WHERE usernamePengunjung = ?', [username]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            queryResult = await connection.execute('UPDATE pengunjung SET namaPengunjung = ? WHERE usernamePengunjung = ?', [
                pengunjung.namaPengunjung, username
            ]);

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }

    async updatePengunjungTelp(username, params) {
        const pengunjung = {
            noHpPengunjung: params.noHpPengunjung,
        };

        try {
            const connection = await this.dbPool.getConnection();

            let queryResult = await connection.execute('SELECT usernamePengunjung FROM pengunjung WHERE usernamePengunjung = ?', [username]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            queryResult = await connection.execute('UPDATE pengunjung SET noHpPengunjung = ? WHERE usernamePengunjung = ?', [
                pengunjung.noHpPengunjung, username
            ]);

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }

    async updatePengunjungAlamat(username, params) {
        const pengunjung = {
            alamatPengunjung: params.alamatPengunjung,
        };

        try {
            const connection = await this.dbPool.getConnection();

            let queryResult = await connection.execute('SELECT usernamePengunjung FROM pengunjung WHERE usernamePengunjung = ?', [username]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            queryResult = await connection.execute('UPDATE pengunjung SET alamatPengunjung = ? WHERE usernamePengunjung = ?', [
                pengunjung.alamatPengunjung, username
            ]);

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('pengunjung data is not found');
            throw new InternalServerError('an error occurred while getting pengunjung data');
        }
    }
}

module.exports = PengunjungService;