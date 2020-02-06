const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.send(`Server is up and running...`)
})

router.get('/data', async (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if(err) res.status(500)

        data = JSON.parse(data)
        res.json({ data })
    })
})

module.exports = router