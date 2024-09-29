const express = require('express')
const router = express.Router()
const db = require('../Database/mongoDB')
const handleError = require('../handleError')


router.post('/post', async (req, res) => {
    try {
        await db.employees.create(req.body)
        res.send({
            message: "Data Saved successfully"
        })
    } catch (err) {
        handleError(200, err.message, res)
    }
})


router.get('/List', async (req, res) => {
    try {
        res.send({
            data: await db.employees.find({} , { _id: 0, UID: 1, Name: 1 })
        })
    } catch (error) {
        handleError(500, error.message, res)
    }
})


router.get('/Details/:UID', async (req, res) => {
    let UID = +req.params.UID
    try {
        res.send({
            message: 'Data Fetched',
            data: await db.employees.findOne({ UID: UID }, { _id: 0 })
        })
    } catch (error) {
        handleError(500, error.message, res)
    }

})



router.put('/Update', async (req, res) => {
    let { UID, Name, Email, Phone, State, District, Dob, Joining_Date, Intern_Type, Gender } = req.body

    try {

        await db.employees.updateOne(
            { UID: UID },
            {
                $set:
                    { Name: Name, Email: Email, Phone: Phone, State: State, District: District, Dob: Dob, Joining_Date: Joining_Date, Intern_Type: Intern_Type, Gender: Gender }
            })

        res.send({
            message: "Data Updated Successfully"
        })

    } catch (error) {
        handleError(500, error.message, res)
    }

})


router.delete('/Delete/:UID', async (req, res) => {
    let uid = +req.params.UID

    try {
        await db.employees.deleteOne({ UID: uid })
        res.send({
            message: "Data Deleted Successfully"
        })
    } catch (error) {
        handleError(500, error.message, res)
    }
})


router.get('/States', async (req, res) => {
    try {
        res.send({
            data: await db.States.find({}, { _id: 0 })
        })
    } catch (error) {
        handleError(500, error.message, res)
    }
})


router.get('/District/:id', async (req, res) => {
    let state_id = +req.params.id
    try {
        res.send({
            data: await db.Districts.find({ State_Id: state_id }, { _id: 0 })
        })
    } catch (error) {
        handleError(500, error.message, res)
    }
})



module.exports = router