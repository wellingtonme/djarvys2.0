import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { generateTokens } from './oauth';

const strategyOptions = {
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
};

passport.use(new LocalStrategy(strategyOptions, (req, username, password, done) => {
	if (username === 'admin' && password === 'admin') {
		done(null, { id: 1, name: 'Admin', username: 'admin', email: 'admin@djarvys.com' });
	} else {
		done(new Error('Invalid username or password'), false, {});
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = { id: 1, name: 'Admin', username: 'admin', email: 'admin@djarvys.com' };
		done(null, user);
	} catch (err) {
		done(err);
	}
});

export const localAuthenticatorHandler = (ctx, next) => {
	return passport.authenticate('local', async (err, user, info) => {
		if (err || !user) {
			ctx.status = 401;
			ctx.body = err.message;
		} else {
			try {
				const { accessToken, refreshToken } = await generateTokens(user, 'shazankarai');
				ctx.body = Object.assign({}, user, { token: accessToken, refresh: refreshToken });
				ctx.logIn(user, null);
			} catch (err) {
				ctx.throw(err, 500);
			}
		}
	})(ctx, next);
};

export default passport;
