const jwt = require('jsonwebtoken')
let secret = 'thereisnothing'

function verifyT(token, next) {
    jwt.verify(token, secret, (err) => {
        if (err) {
            throw err // throw is neccessary here
        } else {
            next()
        }
    })
}

module.exports = verifyT;



