import Router from 'koa-router';

const router = new Router({
	prefix: '/api/v1/auth'
});

const getAuth = async ctx => {
	ctx.body = {
		auth: true
	};
};

router.get('/', getAuth);

export default router;
