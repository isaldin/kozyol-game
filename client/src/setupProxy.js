// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', {
        "target": "http://localhost:8041",
        "secure": false,
        "changeOrigin": true
    }));
};