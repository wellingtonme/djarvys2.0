import request from 'supertest-as-promised';
import app from '../../server/index.js';
import knex from '../../server/db/connection.js';

process.env.NODE_ENV = 'test';
const PATH = '/api/v1/auth';

const userToLogin = {
	username: 'admin',
	password: 'admin'
};

describe(`Routes: auth`, () => {
	beforeEach(() => {
		return knex.migrate
			.rollback()
			.then(() => {
				return knex.migrate.latest();
			})
			.then(() => {
				return knex.seed.run();
			});
	});

	afterEach(() => {
		return knex.migrate.rollback().then(() => {
			app.close();
		});
	});

	describe(`POST ${PATH}/login `, () => {
		it('should return json', () => {
			const keysToHave = ['id', 'name', 'username', 'email', 'token', 'refresh'];
			return request(app).post(`${PATH}/login`)
				.send(userToLogin)
				.expect(200)
				.then(res => {
					expect(res.body).toBeDefined();
					expect(Object.keys(res.body)).toEqual(expect.arrayContaining(keysToHave));
				});
		});
	});
});
