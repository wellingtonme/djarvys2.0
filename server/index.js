import Koa from 'koa';
import routers from './routers';

const app = new Koa();
const PORT = 1337;

app.use(routers.auth);

const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

export default server;
