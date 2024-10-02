import mongoose from "mongoose"

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


const states = mongoose.model.states || mongoose.model('states', stateSchema)


export default states