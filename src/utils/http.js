import axios from 'axios'

export function createAxios({ context, getStore, router }) {
    const http = axios.create({
        baseURL: context ? 'https://extension-ms.juejin.im' : '/juejin'
    })
    http.interceptors.request.use(
        config => {
            // console.log('request config:', config, getStore().state)
            return config
        },
        err => Promise.reject(err)
    )
    http.interceptors.response.use(
        response => {
            console.log('response:', response.data);
            return response.data
        },
        err => {
            console.log('http response:', err)
            const res = {}
            if (err.response.status === 404) {
                res.code = 404
                res.url = err.response.config.url
            }
            return Promise.reject(res)
        }
    )

    return http
}