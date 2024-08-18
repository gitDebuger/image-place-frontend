const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader')
            .end();
    },
    defaultBaseUrl: process.env.BACKEND_BASE_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : 'https://file.imageplc.com',
})
