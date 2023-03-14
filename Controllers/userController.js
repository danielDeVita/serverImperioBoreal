const User = require('../models/User')


const getUsers = async () => {
    try {
        const users = await User.find()
        if (!users.length) throw new Error("No se encontraron usuarios en la base de datos")
        return users;
    } catch (error) {
        return error.message;
    }
}

const postNewUser = async (user) => {
    try {
        if (!user.first_name || !user.password || !user.email) throw new Error("Falta información acerca del usuario");
        const newUser = new User(user)
        newUser.save(newUser)
        return newUser
    } catch (error) {
        return error.message;
    }
}

module.exports = { getUsers, postNewUser }