import request from 'supertest-as-promised';
import app from '../../server/index.js';

process.env.NODE_ENV = 'test';

afterEach(() => {
	app.close();
});

describe('GET /auth/', () => {
	it('should return json', () => {
		return request(app).get('/auth')
			.expect(200)
			.then(res => {
				expect(res.body).toBeDefined();
				expect(typeof res.body.auth).toBe('boolean');
				expect(res.body.auth).toBe(true);
			});
	});
});
