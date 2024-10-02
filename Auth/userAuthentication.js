import jwt from 'jsonwebtoken'
import express from 'express'
import Connect from '../Database/dbConfig/connect.js'
import users from '../Database/model/userModel.js'
import bcrypt from 'bcryptjs'


const router = express.Router()


router.post('/checkUser', async (req, res) => {

    try {

        const { Email } = await req.body

        await Connect()

        const user = await users.findOne({ Email })

        if (user) {
            return res.status(409).send({
                message: "Email already exists",
            })
        }

        return res.send({
            message: "Email is available",
        })

    } catch (error) {

        return res.status(500).send({
            message: error.message,
        })

    }

})


router.post('/signUp', async (req, res) => {

    try {

        const { Name, Email, Password } = await req.body

        await Connect()

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(Password, salt)


        const USER = new users({
            Name,
            Email,
            Password: hashedPassword
        })

        await USER.save() // inserting user data

        return res.send({
            message: 'User Signed-Up Successfully',
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})



router.post('/signIn', async (req, res) => {

    try {

        const { Email, Password } = req.body

        await Connect() 

        const USER = await users.findOne({ Email })

        if (!USER) {
            return res.status(404).json({
                message: 'Uer Not Found'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(Password, USER.Password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid Email or Password'
            })
        }

        const token = await jwt.sign({ Name: USER.Name, Email: USER.Email, ID: USER._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 48 })

        return res.send({
            Name: USER.Name,
            Email: USER.Email,
            Token: token,
            ExpiresIn: 48
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})


export default router
