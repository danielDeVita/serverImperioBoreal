const User = require('../models/User')


const getUsers = async () => {
    try {
        const users = await User.find({})
        if (!users.length) throw new Error("No users found in DB") 
        return users;
    } catch (error) {
        return error.message;
    }
}

module.exports = { getUsers }
