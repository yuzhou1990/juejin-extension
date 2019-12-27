const express = require('express')
const api = express.Router()
const { list } = require('./data')

api.get('/list', (req, res) => {
    res.json({
        code: 0,
        data: list
    })
})

module.exports = api