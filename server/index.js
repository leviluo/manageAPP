const koa = require('koa');
const router = require('koa-router')();
const routers = require("./routers")
const bodyParser = require("koa-bodyparser")
var staticServer = require('koa-static');
var path = require('path');

const app = koa();

app.use(bodyParser());

app.use(staticServer('./www'));

routers(router);

app.use(router.routes())

app.on('error', function(err) {
    log.error('server error', err);
});

app.listen(3001);