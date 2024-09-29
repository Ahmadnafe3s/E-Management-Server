
function error(Status, message, res) {
    res.status(Status).send({
        error: {
            message: message
        }
    })
}

module.exports = error;