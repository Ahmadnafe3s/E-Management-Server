import mongoose from 'mongoose'
import { configDotenv } from 'dotenv';

configDotenv();

const Connect = async () => {

    if (mongoose.connection.readyState === 1) {
        console.log(" Database already connected");
        return null
    }

    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Database is connected");

}


export default Connect