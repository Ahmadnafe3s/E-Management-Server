import express from 'express'
import cors from 'cors'
import empRoutes from './routes/employeesRoutes.js'
import userRoutes from './Auth/userAuthentication.js'
import F_passwordRoutes from './Auth/forgetPassword.js'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'


// Calling functuons

configDotenv();


const app = express()



const tokenMiddleWare = async (req, res, next) => {

    try {

        const { token } = req.headers

        const isPublicPath = new Set(['/Register', '/logIn', '/checkUser', '/validateEmail', '/verifyOtp', '/updatePassword'])

        if (isPublicPath.has(req.path)) return next()

        await jwt.verify(token, process.env.JWT_SECRET)

        next()

    } catch (error) {

        res.status(401).json({ message: error.message })

    }

}



app.use(cors()) // (CORS) is a protocol that allows web applications to access resources from other domains

app.use(express.json()) // will parse all request into json

app.use(tokenMiddleWare)

app.use('/', empRoutes)

app.use('/', userRoutes)

app.use('/', F_passwordRoutes)




app.listen(3000, () => {
    console.log('Server is running.....');
})