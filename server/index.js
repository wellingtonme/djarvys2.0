import Koa from 'koa';
import routers from './routers';
import logger from 'koa-logger';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import passport from './api/auth/passport';

process.env.JWT_SECRET = process.env.JWT_SECRET | 'shazankarai';

const app = new Koa();
app.proxy = true;
app.keys = ['shazankarai'];

const PORT = 1337;

app.use(logger())
	.use(session({}, app))
	.use(bodyParser())
	.use(passport.initialize())
	.use(passport.session())
	.use(routers.auth);

const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

export default server;
