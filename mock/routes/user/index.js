const express = require('express')
const api = express.Router()

api.post('/login', (req, res) => {
    res.cookie('token', 'abc')
    res.json({ code: 0, data: { name: 'chiu', token: 'abc' } })
})

module.exports = api