const express = require('express')
const router = express.Router()
const fs = require('fs')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config()

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

router.post('/resume/request', (req, res) => {

    const name = req.body.name
    const from = req.body.email
    const body = req.body.message

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_MAIL,
            pass: process.env.GOOGLE_PASSWORD
        }
    });

    const mailOptions = {
        from: `${name} <${from}>`,
        to: `MichaelJohn Isip <${process.env.GOOGLE_MAIL}>`,
        subject: 'Resume Request | ' + name,
        text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201);
        }
    });
} )

module.exports = router