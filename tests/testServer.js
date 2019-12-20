'use strict';

const Koa = require('koa');
const router = require('koa-router')();
const healthcheckPlugin = require('../index');

const app = new Koa();
const checks = [{
    name: 'awesome-site',
    type: 'ping',
    configuration: {
        url: 'http://my-awesome-site.io/ping',
        //url: 'http://localhost:3456/ping',
    },
}, {
    type: 'ping',
    configuration: {
        url: 'http://my-awesome-site.io/another-url',
    },
}];

healthcheckPlugin(app, {
    // Array of custom checks
    "checks": checks,
    "routes": {
        "healthcheck": true,
        "metrics": true,
        "ping": true,
        "version": true
    },
    "version": "1.6.3"
});

router.get('/200', (ctx) => { ctx.status = 200; });
router.get('/400', (ctx) => { ctx.status = 400; });
router.get('/500', (ctx) => { ctx.status = 500; });

app.use(router.routes());

const server = app.listen(3456);

module.exports = server;
