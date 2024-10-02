import express from 'express'
import speakeasy from 'speakeasy'
import Connect from '../Database/dbConfig/connect.js'
import users from '../Database/model/userModel.js'
import sendMail from '../helper/nodemailer.js'
import bcrypt from 'bcryptjs'


const router = express.Router()


router.post('/verifyEmail', async (req, res) => {

    try {

        const { Email } = await req.body

        await Connect();

        const USER = await users.findOne({ Email})

        if (!USER) {
            return res.status(404).json({
                message: 'User not found',
            })
        }


        const secret = await speakeasy.generateSecret({ length: 10 });

        const otp = await speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
            step: 300
        });


        await sendMail(Email, { OTP: otp, Name: USER.Name }, "Forget Password")

        res.send({
            secretKey: secret.base32,
            message: 'OTP sent successfully',
            Email
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }

})



router.post('/verifyOtp', async (req, res) => {

    try {

        const { Otp, secretKey } = await req.body

        await Connect();

        const isOtpVerified = speakeasy.totp.verify({
            secret: secretKey,
            encoding: 'base32',
            token: +Otp,
            window: 2,
            step: 300
        });


        if (!isOtpVerified) {
            return res.status(400).json({
                message: 'invalid Otp!'
            })
        }


    } catch (error) {

        return res.status(500).json({
            message: 'Something went wrong',
        })

    }

})



router.post('/updatePassword', async (req, res) => {

    try {

        const { Email, Password } = req.body

        await Connect();

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(Password, salt)

        await users.updateOne({ Email: email }, { $set: { Password: hashedPassword } })


        res.send({
            message: 'Password Updated!'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
})


export default router