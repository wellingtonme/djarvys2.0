import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { promisify } from 'util';
import { createClient } from 'redis';
import config from './config.js';

const redis = createClient();

const redisSetexAsync = promisify(redis.setex);
const signAsync = promisify(jwt.sign);
const randomBytesAsync = promisify(crypto.randomBytes);

const generateJwtId = async () => {
	try {
		let jti = await randomBytesAsync(32);
		return Promise.resolve(jti.toString('hex'));
	} catch (error) {
		return Promise.reject(error);
	}
};

export const generateTokens = async (payload, secret, opts = {}) => {
	try {
		const { auth } = config;

		const accessTokenId = await generateJwtId();
		const refreshTokenId = await generateJwtId();

		const accessTokenPayload = Object.assign({}, payload, { jti: accessTokenId });
		const refreshTokenPayload = Object.assign({}, { jti: refreshTokenId, ati: accessTokenId });

		const accessTokenOptions = Object.assign({}, { expiresIn: auth.accessTokenTtl }, opts);
		const refreshTokenOptions = Object.assign({}, { expiresIn: auth.refreshTokenTtl }, opts);

		const refreshToken = await signAsync(refreshTokenPayload, secret, refreshTokenOptions);
		const accessToken = await signAsync(accessTokenPayload, secret, accessTokenOptions);

		await redisSetexAsync(refreshTokenId, auth.refreshTokenTtl, payload.user.username);

		return Promise.resolve({
			accessToken: accessToken,
			refreshToken: refreshToken
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
