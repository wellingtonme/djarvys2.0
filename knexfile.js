const path = require('path');
const BASE_PATH = path.join(__dirname, 'server', 'db');
const BASE_DB_URL = 'postgres://postgres:1234@localhost:5432';

const config = {
	client: 'pg',
	migrations: {
		directory: path.join(BASE_PATH, 'migrations')
	},
	seeds: {
		directory: path.join(BASE_PATH, 'seeds')
	},
	debug: false
};

const testConfig = Object.assign({}, config, { connection: BASE_DB_URL + '/djarvys' });
const devConfig = Object.assign({}, config, { connection: BASE_DB_URL + '/djarvys' });

module.exports = {
	test: testConfig,
	development: devConfig
};
