const Hashing = require('./hasing')
const db = require('../Database/mongoDB')
const handleErr = require('../handleError')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router() 
let secret = 'thereisnothing'


router.post('/checkUser', async (req, res) => {
    const user = await db.Users.findOne({ Email: req.body.Email })

    if (user) {
        res.send({
            message: 'Email already exists...'
        })
    } else {
        res.send({
            message: null
        })
    }

})



router.post('/Register', async (req, res) => {
    const { Name, Email, Password } = req.body

    try {
        await db.Users.create({ Name: Name, Email: Email, Password: Hashing.hash(Password)})
        
        

        jwt.sign({ Name, Email }, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.log(err);
            }
            res.send({
                Name: Name,
                Token: token,
                ExpireIn: 3600,
                message: 'Account Registred Successfully',
            })
        }
        )

    } catch (error) {
        handleErr(500, error.message, res)
    }
})



router.post('/logIn', async (req, res) => {
    const { Email, Password } = req.body
    const user = await db.Users.findOne({ Email: req.body.Email })

    try {
        if (!user || !Hashing.verifyPassword(Password, user.Password)) {
            handleErr(401, 'Email or Password is Wrong', res)
        } else {
            jwt.sign({ Email }, secret, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.log(err);
                }
                res.send({
                    Name: user.Name,
                    Token: token,
                    ExpireIn: 3600,
                    message: 'Account logIn Successfully',
                })
            }
            )
        }
    } catch (error) {
        handleErr(500, error.message, res)
    }
})

module.exports = router;
