import nodemailer from 'nodemailer'
import { configDotenv } from 'dotenv'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mustache from 'mustache';
import { promises as fs } from 'fs'

configDotenv();

// Convert ES module URL to filename and directory name (coz it cant be use in ES module)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sendMail = async (email, Render, subject) => {

    try {

        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });


        const htmlfilePath = join(__dirname, './OTP.html')

        const readFile = await fs.readFile(htmlfilePath, { encoding: 'utf-8' })

        const renderedHtml = await mustache.render(readFile, Render)

        const mailDetails = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: renderedHtml,
        };


        await mailTransporter.sendMail(mailDetails)

    } catch (error) {
        throw new Error(error.message)
    }

}


export default sendMail