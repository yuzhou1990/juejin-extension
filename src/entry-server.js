import { createApp } from './app'

export default context => {
    // 返回一个Promise
    // 确保路由或组件准备就绪
    return new Promise((resolve, reject) => {
        // 创建Vue实例
        const { app, router, store } = createApp(context)
        // 跳转首屏地址
        router.push(context.url)
        // context.cookies.token && (store.state.user.token = context.cookies.token)
        // 路由就绪，完成Promise
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            // resolve(app)
            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(({ asyncData }) => asyncData &&
                asyncData({
                    store,
                    route: router.currentRoute,
                    cookies: context.cookies,
                    isServer: true,
                    isClient: false
                }).catch(err => console.log(`${router.currentRoute.path}报错了,${err}`))
            )).then(() => {
                console.log('async data server:', store.state)

                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state

                resolve(app)
            }).catch(err => {
                console.log('render error:', err)
                context.serverError = true
                resolve(app)
            })
        }, err => {
            console.log('router error', err);
            context.serverError = true
            resolve(app)
        })
    })
}