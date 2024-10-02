import mongoose from "mongoose"

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


const districts = mongoose.model.districts || mongoose.model('districts', districtSchema)

export default districts
