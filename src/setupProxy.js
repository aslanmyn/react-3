// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://www.freetogame.com",
            changeOrigin: true,
            secure: true,
            pathRewrite: {
                "^/api": "/api",
            },
        })
    );
};
