import mongoose from 'mongoose'


const empSchema = new mongoose.Schema(
    {
        UID: {
            type: Number,
            required: true,
            unique: true,
        },
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
        },
        Phone: {
            type: Number,
            type: String,
        },
        State: {
            type: String,
            required: true
        },
        District: {
            type: String,
            required: true,
        },
        Dob: {
            type: String,
            required: true,
        },
        Joining_Date: {
            type: String,
            required: true,
        },
        Intern_Type: {
            type: String,
            required: true,
        },
        Gender: {
            type: String,
            required: true,
        }
    },
    { versionKey: false },

)



const employees = mongoose.models.employees || mongoose.model('employees', empSchema)


export default employees