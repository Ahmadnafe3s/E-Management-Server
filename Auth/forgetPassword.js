const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const db = require('../Database/mongoDB')
const handleError = require('../handleError')
const path = require('path')
const fs = require('fs');
const mustache = require('mustache');
const speakeasy = require('speakeasy');
const Hashing = require('./hasing')
require('dotenv').config()

const htmlfilePath = path.join(__dirname, './OTP.html')
const secret = speakeasy.generateSecret({ length: 10 });


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


router.post('/validateEmail', async (req, res) => {

    const email = req.body.Email
    const user = await db.Users.findOne({ Email: email })

    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        step: 300
    });


    if (user) {
        let data = {
            OTP: otp,
            Name : user.Name
        };

        const readFile = fs.readFileSync(htmlfilePath, "utf-8")
        const renderedHtml = mustache.render(readFile, data);

        let mailDetails = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Forget Password',
            html: renderedHtml,
        };


        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                handleError(404, 'An error encounterd!', res)
            } else {
                res.send({
                    secretKey: secret.base32,
                    message: 'OTP sent successfully',
                    email: email // req.body.Email
                })
            }
        });

    }

    else {
        handleError(404, 'User not found!', res)
    }
})


router.post('/verifyOtp', (req, res) => {

    let { Otp, secretKey } = req.body

    const verificationResult = speakeasy.totp.verify({
        secret: secretKey,
        encoding: 'base32',
        token: +Otp,
        window: 2,
        step: 300
    });

    if (verificationResult) {
        res.send({
            message: 'OTP verified'
        })
    } else {
        handleError(404, 'Invalid OTP!', res)
    }
})



router.post('/updatePassword', async (req, res) => {
    let { email, newPassword } = req.body

    try {
        await db.Users.updateOne({ Email: email }, { $set: { Password: Hashing.hash(newPassword) } })
        res.send({
            message: 'Password Updated!'
        })
    } catch (error) {
        handleError(500, 'Something went wrong!', res)
    }
})


module.exports = router;