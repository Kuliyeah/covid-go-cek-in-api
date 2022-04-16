const Joi = require('joi');
const SQLNoRow = require('../exceptions/sql_no_row');
const NotFoundError = require('../exceptions/not_found_error');
const InternalServerError = require('../exceptions/internal_server_error');
const BadRequest = require('../exceptions/bad_request');

class MitraService {
    constructor(promiseMysqlPool) {
        this.dbPool = promiseMysqlPool;
    }

    async getOneMitra(id) {
        try {
            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('SELECT * FROM mitra WHERE idMitra = ?', [id]);
            if (queryResult[0].length < 1) throw new SQLNoRow();

            connection.release();

            return queryResult[0][0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('mitra data is not found');
            throw new InternalServerError('an error occurred while getting mitra data');
        }
    }

    async getManyMitra() {
        try {
            const connection = await this.dbPool.getConnection();

            const queryResult = await connection.execute('SELECT * FROM mitra ORDER BY idMitra DESC');
            if (queryResult[0].length < 1) throw new NotFoundError('mitra data is not found');

            connection.release();

            return queryResult[0]

        } catch (err) {
            console.error(err.message);

            if (err instanceof SQLNoRow) throw new NotFoundError('mitra data is not found');
            throw new InternalServerError('an error occurred while getting mitra data');
        }
    }
}

module.exports = MitraService;