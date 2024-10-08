import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true
    }
},
    { versionKey: false }
)


const users = mongoose.models.users || mongoose.model('users', userSchema)


export default users