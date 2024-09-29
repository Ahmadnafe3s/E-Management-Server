const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/E-ManagementDB')
    .then(() => console.log('Database Connected..'))
    .catch((err) => console.log("Mongo Error " + err))

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

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    }
},
    { versionKey: false }
)


const stateSchema = {
    Id: {
        type: Number,
        required: true,
        unique: true,
    },

    Name: {
        type: String,
        required: true,
    }
}

const districtSchema = {
    Id: {
        type: Number,
        required: true,
        unique: true
    },

    Name: {
        type: String,
        required: true,
    },

    State_Id: {
        type: Number,
        required: true
    }
}



const employees = mongoose.model('employees', empSchema)

const States = mongoose.model('states', stateSchema)

const Districts = mongoose.model('districts', districtSchema)

const Users = mongoose.model('users', userSchema)

module.exports = { employees, States, Districts, Users }