const express = require('express')
const app = new express()

const user = require('./routes/user')
const player = require('./routes/player')

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.use('/player', player)
app.use('/user', user)

app.listen(8080, () => console.log('MOCK服务器启动成功 http://localhost:8080'))
