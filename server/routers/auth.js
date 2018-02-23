import Router from 'koa-router';
import { localAuthenticatorHandler } from '../api/auth/passport.js';

const router = new Router({
	prefix: '/api/v1/auth'
});

router.post('/login', localAuthenticatorHandler);
router.get('/', ctx => {
	ctx.body = { message: ctx.isAuthenticated() };
});

export default router;
