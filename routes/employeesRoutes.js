import express from 'express'
import employees from '../Database/model/empModel.js'
import states from '../Database/model/statesModel.js'
import districts from '../Database/model/districtModel.js'
import Connect from '../Database/dbConfig/connect.js'

const router = express.Router()



router.post('/postEmployee', async (req, res) => {

    try {

        await Connect();

        const employeeData = req.body

        const Employee = new employees(employeeData) // modelling

        await Employee.save() // storing data

       return res.send({
            message: "Data Stored successfully"
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

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
        return res.status(500).json({
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

        return res.status(500).json({
            message: error.message
        })

    }

})



router.put('/updateEmployee', async (req, res) => {

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

        return res.status(500).json({
            message: error.message
        })

    }

})


router.delete('/deleteEmployee/:UID', async (req, res) => {

    try {

        await Connect();

        const { UID } = await req.params

        await employees.deleteOne({ UID })

        return res.send({
            message: "Employee Deleted Successfully"
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })

    }
})


router.get('/States', async (req, res) => {

    try {

        await Connect();

        const States =  await states.find({}, { _id: 0 })

        return res.send({
            States
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })

    }
})


router.get('/District/:stateId', async (req, res) => {

    try {

        await Connect();

        const State_Id = +req.params.stateId
        
        const Districts = await districts.find({ State_Id }, { _id: 0 })

        return res.send({
            Districts
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })

    }
})



export default router