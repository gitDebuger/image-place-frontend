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
    }
})
