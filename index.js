const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const handleError = require('./handleError')
const verifyToken = require('./Auth/verifyToken')


const tokenMiddleWare = (req, res, next) => {
    const token = req.headers.token

    try {
        if (req.path === '/Register' || req.path === '/logIn' || req.path === '/checkUser' || req.path === '/validateEmail' || req.path === '/verifyOtp' || req.path === '/updatePassword') {
            next()
        } else {
            verifyToken(token, next)
        }

    } catch (error) {
        handleError(401, 'Token : ' + error.message, res)
    }

}



app.use(cors())

app.use(bodyparser.json())

app.use(tokenMiddleWare)

app.use('/', require('./routes/APIs'))

app.use('/', require('./Auth/userAuthentication'))

app.use('/', require('./Auth/forgetPassword'))




app.listen(3000, () => {
    console.log('Server is running.....');
})