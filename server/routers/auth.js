import Router from 'koa-router';

const router = new Router({
	prefix: '/auth'
});

const getAuth = async ctx => {
	ctx.body = {
		auth: true
	};
};

router.get('/', getAuth);

export default router;
