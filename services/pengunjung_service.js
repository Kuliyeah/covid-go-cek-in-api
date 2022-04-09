const SQLNoRow = require('../exceptions/sql_no_row');
const NotFoundError = require('../exceptions/not_found_error');
const InternalServerError = require('../exceptions/internal_server_error');

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
}

module.exports = PengunjungService;