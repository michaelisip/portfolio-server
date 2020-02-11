const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(router)
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))