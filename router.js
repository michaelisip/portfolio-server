/* eslint-disable no-console */
const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');

const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
  res.send('Server is up and running...');
});

router.get('/data', async (req, res) => {
  fs.readFile('./data.json', (err, json) => {
    if (err) res.status(500);
    const data = JSON.parse(json);
    res.json({ data });
  });
});

router.post('/resume/request', (req, res) => {

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: `MichaelJohn Isip <${process.env.GOOGLE_MAIL}>`,
    subject: `Resume Request | ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500);
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(201);
    }
  });
});

module.exports = router;
