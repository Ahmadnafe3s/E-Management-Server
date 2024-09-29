const bcrypt = require('bcrypt')

function hash(password) {
    return bcrypt.hashSync(password, 10, (err, Hash) => {
        if (err) {
            console.log(err);
        } else {
            return Hash
        }
    })

}

function verifyPassword(freshPassword, Hash) {
    return bcrypt.compareSync(freshPassword, Hash, (err, res) => {
        if (err) {
            console.log('Something Went wrong');
        } else {
            return res;
        }
    })
}

module.exports = { hash, verifyPassword };