require('dotenv').config();
const configs = require('./configs/configs');
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const PengunjungService = require('./services/pengunjung_service');
const PengunjungHandler = require('./handlers/pengunjung_handler');
const MitraService = require('./services/mitra_service');
const MitraHandler = require('./handlers/mitra_handler');
const responses = require('./responses/responses');

// instantiate configs
const appConfig = configs.get('app');
const mysqlConfig = configs.get('mysql');

/**
 * main() will run the application.
 */
async function main() {
    const mysqlPool = mysql.createPool({
        ...mysqlConfig,
        timezone: '+07:00'
    })
    const promiseMysqlPool = mysqlPool.promise();

    const pengunjungService = new PengunjungService(promiseMysqlPool);
    const pengunjungHandler = new PengunjungHandler(pengunjungService);
    const mitraService = new MitraService(promiseMysqlPool);
    const mitraHandler = new MitraHandler(mitraService);

    const router = express();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

    router.get('/v1/pengunjung', pengunjungHandler.getManyPengunjung.bind(pengunjungHandler));
    router.get('/v1/pengunjung/:id', pengunjungHandler.getOnePengunjung.bind(pengunjungHandler));
    router.get('/v1/pengunjung/login/:username', pengunjungHandler.getOnePengunjungByUsername.bind(pengunjungHandler));
    router.post('/v1/pengunjung', pengunjungHandler.createPengunjung.bind(pengunjungHandler));
    router.put('/v1/pengunjung/:id', pengunjungHandler.updatePengunjung.bind(pengunjungHandler));

    router.get('/v1/mitra', mitraHandler.getManyMitra.bind(mitraHandler));
    router.get('/v1/mitra/:id', mitraHandler.getOneMitra.bind(mitraHandler));
    router.get('/v1/mitra/cari/:nama', mitraHandler.getMitraByNama.bind(mitraHandler));

    router.get('/', function(_, res) {
        responses.success(res, 200, 'OK', 'application is running properly', null, null);
    });

    const server = router.listen(appConfig.port, function() {
        console.info('application is running on port', appConfig.port);
    });

    process.on('SIGINT', function() {
        server.close(function(err) {
            if (err) {
                console.error(err.message);
            }
            console.info('server is gracefully shutdown')
        });

        mysqlPool.end(function(err) {
            if (err) {
                console.error(err.message);
            }
            console.info('mysql is gracefully shutdown')
        })

        setTimeout(function() {
            process.exit(0);
        }, 5 * 1000)
    })
}

main();