const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const router = require('./router')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use(router)
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))