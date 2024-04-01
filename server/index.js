const express = require('express')
const fs = require('fs')
const path = require('path')
// express实例
const app = express()
const cookieParser = require('cookie-parser')
// 创建打包渲染器
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
// 创建渲染器
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync('./src/index.temp.html', 'utf-8'),
    clientManifest
})
function render2String(context) {
    return new Promise((resolve, reject) => {
        // renderToString可以将Vue实例转换为html字符串
        // 若未传递回调函数，则返回Promise
        renderer.renderToString(context, (err, html) => {
            if (err) {
                reject(err)
                return
            }
            resolve(html)
        })
    })
}
const proxy = require('http-proxy-middleware')

app.use(express.static('./dist/client', { index: false }))
app.use(cookieParser())
app.use('/juejin', proxy({
    target: 'https://extension-ms.juejin.im',
    changeOrigin: true,
    pathRewrite: {
        '^/juejin': ''
    },
}))

function csr(res) {
    // 读取文件
    const filename = path.resolve(process.cwd(), 'dist/client/index.html')
    const html = fs.readFileSync(filename, 'utf-8')
    return res.send(html)
}
// 服务端路由声明
app.get('*', async function (req, res) {
    console.log('request: ', req.url)

    // 配置开关开启csr
    // 服务器负载过高开启csr
    if (req.query._mode === 'csr') {
        return csr(res)
    }

    const context = {
        title: '掘金酱Demo',
        url: req.url,
        serverError: false,
        cookies: req.cookies
    }
    try {
        const html = await render2String(context)
        res.send(html)
    } catch (error) {
        console.log('req error:', error);

        res.status(500).send('Internal Server Error')
    }
})

const PORT = 23000
app.listen(23000, () => {
    console.log(`渲染服务器启动成功 http://localhost:${PORT}`);
})