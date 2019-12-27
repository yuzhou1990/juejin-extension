// @todo 热加载
const _ = require('lodash')
const path = require('path')
// memory-fs可以使webpack将文件写入到内存中，而不是写入到磁盘。
const MFS = require('memory-fs')
const webpack = require('webpack')
const clientConfig = _.cloneDeep(require('@vue/cli-service/webpack.config'))
const serverConfig = _.cloneDeep(require('@vue/cli-service/webpack.config'))
// webpack热加载需要
const webpackDevMiddleware = require('webpack-dev-middleware')
// 配合热加载实现模块热替换
const webpackHotMiddleware = require('webpack-hot-middleware')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

// 读取vue-ssr-webpack-plugin生成的文件
const readFile = (fs, filePath, file) => {
    try {
        console.log('path', fs, filePath, file);
        console.log('-----------------------------------------------');


        return fs.readFileSync(path.join(filePath, file), 'utf-8')
    } catch (e) {
        console.log('读取文件错误：', e)
    }
}

module.exports = function setupDevServer(app, cb) {
    let bundle
    let clientManifest

    // 监听改变后更新函数
    const update = () => {
        if (bundle && clientManifest) {
            cb(bundle, clientManifest)
        }
    }

    console.log(clientConfig.entry);


    clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry]
    clientConfig.output.filename = '[name].js'

    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // 编译clinetWebpack 插入Koa中间件
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true,
        reload: true
    })
    app.use(devMiddleware)

    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        console.log('client');

        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            clientConfig.output.path,
            'vue-ssr-client-manifest.json'
        ))
        update()
    })
    // 插入Koa中间件(模块热替换)
    app.use(webpackHotMiddleware(clientCompiler))

    serverConfig.entry = './src/entry-server.js'
    serverConfig.output.path = serverConfig.output.path.replace('\\dist\\client', '\\dist\\server')
    serverConfig.target = 'node'
    serverConfig.node = undefined
    serverConfig.output.libraryTarget = 'commonjs2'
    serverConfig.optimization.splitChunks = false
    serverConfig.externals = nodeExternals({
        whitelist: [/\.css$/],
    })
    serverConfig.plugins.pop()
    serverConfig.plugins.pop()
    serverConfig.plugins.push(new VueSSRServerPlugin())

    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length) return

        console.log('server');
        //  vue-ssr-webpack-plugin 生成的bundle
        bundle = JSON.parse(readFile(mfs, serverConfig.output.path, 'vue-ssr-server-bundle.json'))
        update()
    })
}
