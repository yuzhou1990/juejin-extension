// 导入两个webpack插件，分别负责生成服务端和客户端bundle
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// 优化策略
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 根据 WEBPACK_TARGET 环境变量做相应输出
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
    css: {
        extract: false,
    },
    outputDir: './dist/' + target,
    configureWebpack: () => ({
        // 将 entry 指向应用程序的 server/client 文件
        entry: `./src/entry-${target}.js`,
        // 对 bundle renderer 提供 source-map 支持
        devtool: 'source-map',
        // 这允许 webpack 以 Node 使用方式处理动态导入(dynamic import)
        // 并且还会在编译 Vue 组件时告知 `vue-loader` 输送面向服务器代码(server-oriented code)
        target: TARGET_NODE ? 'node' : 'web',
        // mock node 中的一些全局变量
        node: TARGET_NODE ? undefined : false,
        output: {
            // 此处告知 server bundle 使用 Node 风格导出模块
            libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
        },
        // 处置化应用程序依赖模块，可以使服务器构建速度更快，并生成较小的 bundle 文件
        externals: TARGET_NODE
            ? nodeExternals({
                // 不要外置化 webpack 需要处理的依赖模块
                // 可以在这里添加更多的文件类型，例如：未处理 *.vue 原始文件
                // 你还应该将修改 `global` (例如polyfill)的依赖模块列入白名单
                whitelist: [/\.css$/],
            })
            : undefined,
        optimization: {
            // 兼容异步路由加载
            splitChunks: TARGET_NODE ? false : undefined,
        },
        // 这是将服务器的整个输出构建为单个 JSON 文件的插件
        // 服务端默认文件名为 `vue-ssr-server-bundle.json`
        plugins:
            TARGET_NODE ?
                [new VueSSRServerPlugin()] :
                [
                    new HtmlWebpackPlugin({
                        filename: 'index.html',
                        template: 'public/index.html',
                        inject: true
                    }),
                    new VueSSRClientPlugin(),
                ],

    }),
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                merge(options, {
                    optimizeSSR: false,
                })
            })
        config.plugin('html').tap(args => {
            args[0].chunksSortMode = 'dependency'
            return args
        })
    },
}