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
            if (queryResult[0].length < 1) {
                throw new SQLNoRow();
            }

            connection.release();

            return queryResult[0][0]

        } catch (err) {
            console.error(err.message);

            let error;

            if (err instanceof SQLNoRow) {
                error = new NotFoundError('visitor data is not found');
            } else {
                error = new InternalServerError('an error occurred while getting visitor data');
            }

            throw error;
        }
    }

    async getManyPengunjung() {
        try {
            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('SELECT * FROM pengunjung ORDER BY idPengunjung DESC');
            if (queryResult[0].length < 1) {
                throw new NotFoundError('visitor data is not found');
            }

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            let error;

            if (err instanceof SQLNoRow) {
                error = new NotFoundError('visitor data is not found');
            } else {
                error = new InternalServerError('an error occurred while getting visitor data');
            }

            throw error;
        }
    }

    async createPengunjung(params) {
        try {
            await PengunjungModel.getCreatePengunjungModel().validateAsync(params);

            const pengunjung = {
                usernamePengunjung: params.usernamePengunjung,
                passwordPengunjung: params.passwordPengunjung,
                namaPengunjung: params.namaPengunjung,
                alamatPengunjung: params.alamatPengunjung,
                noHpPengunjung: params.noHpPengunjung,
                umurPengunjung: params.umurPengunjung,
                jenisKelaminPengunjung: params.jenisKelaminPengunjung,
                statusKesehatan: params.statusKesehatan
            };

            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('INSERT INTO pengunjung SET usernamePengunjung = ?,passwordPengunjung = ?, namaPengunjung = ?, alamatPengunjung = ?, noHpPengunjung = ?, umurPengunjung = ?, jenisKelaminPengunjung = ?, statusKesehatan = ?', [
                pengunjung.usernamePengunjung, pengunjung.passwordPengunjung, pengunjung.namaPengunjung, pengunjung.alamatPengunjung, pengunjung.noHpPengunjung, pengunjung.umurPengunjung, pengunjung.jenisKelaminPengunjung, pengunjung.statusKesehatan
            ]);

            connection.release();

            return queryResult[0];

        } catch (err) {
            console.error(err.message);

            if (err instanceof Joi.ValidationError) {
                throw new BadRequest(err.message);
            }

            throw new InternalServerError('an error occurred while getting pengunjung');
        }
    }
}

module.exports = PengunjungService;