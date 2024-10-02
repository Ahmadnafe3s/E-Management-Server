import express from 'express'
import employees from '../Database/model/empModel.js'
import States from '../Database/model/statesModel.js'
import districts from '../Database/model/districtModel.js'
import Connect from '../Database/dbConfig/connect.js'

const router = express.Router()



router.post('/post', async (req, res) => {

    try {
        await db.employees.create(req.body)
        res.send({
            message: "Data Saved successfully"
        })
    } catch (err) {

    }

})


router.get('/employeesList', async (req, res) => {
    try {

        await Connect();

        const employeesList = await employees.find({}, { _id: 0, UID: 1, Name: 1 })

        return res.send({
            employeesList
        })

    } catch (error) {
        return res.status().json({
            message: error.message
        })
    }
})


router.get('/Details/:UID', async (req, res) => {

    try {

        await Connect();

        const UID = await +req.params.UID

        const details = await employees.findOne({ UID }, { _id: 0 })

        return res.send({
            details
        })

    } catch (error) {

        return res.status().json({
            message: error.message
        })

    }

})



router.put('/Update', async (req, res) => {

    try {

        await Connect();

        const { UID, Name, Email, Phone, State, District, Dob, Joining_Date, Intern_Type, Gender } = await req.body

        await employees.updateOne(
            { UID },
            {
                $set:
                    { Name: Name, Email: Email, Phone: Phone, State: State, District: District, Dob: Dob, Joining_Date: Joining_Date, Intern_Type: Intern_Type, Gender: Gender }
            })

        return res.send({
            message: "Data Updated Successfully"
        })

    } catch (error) {

        return res.status().json({
            message: error.message
        })

    }

})


router.delete('/Delete/:UID', async (req, res) => {

    try {

        await Connect();

        const { UID } = +req.params

        await db.employees.deleteOne({ UID })

        return res.send({
            message: "Employee Deleted Successfully"
        })

    } catch (error) {

        return res.status().json({
            message: error.message
        })

    }
})


router.get('/States', async (req, res) => {

    try {

        await Connect();

        const states =  await States.find({}, { _id: 0 })

        return res.send({

            states

        })

    } catch (error) {

        return res.status().json({
            message: error.message
        })

    }
})


router.get('/District/:stateId', async (req, res) => {

    try {

        await Connect();

        const State_Id = +req.params.stateId
        
        const distrcits = await districts.find({ State_Id }, { _id: 0 })

        return res.send({
            distrcits
        })

    } catch (error) {

        return res.status().json({
            message: error.message
        })

    }
})



export default router