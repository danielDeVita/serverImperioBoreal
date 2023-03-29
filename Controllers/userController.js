const User = require('../models/User')
const main = require('../utils')

const getUsers = async () => {
    try {
        const users = await User.find()
        if (!users.length) throw new Error("No se encontraron usuarios en la base de datos")
        return users;
    } catch (error) {
        return error.message;
    }
}

const postNewUser = async (email, nickname) => {
    try {
        const foundUser = await User.findOne({ email })
        if (foundUser) return foundUser;
        const newUser = new User({
            email,
            username: email
        })
        await main(email, nickname)
        const savedUser = await newUser.save();
        return savedUser
    } catch (error) {
        return error
    }
}

const getUserById = async (id) => {
    try {
        const foundUser = await User.findById(id);
        if (!foundUser) throw new Error('No hay usuarios con ese id');
        return foundUser;
    } catch (error) {
        return error.message;
    }
}

const getUserByMail = async (email) => {
    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser) throw new Error('No hay usuarios con ese email');
        return foundUser;
    } catch (error) {
        return error.message;
    }
}

const updateUser = async (id, username, password, email, userRole) => {
    try {
        let isAdmin
        if(userRole === "admin"){
            isAdmin = true
        } else {
            isAdmin = false
        }
        const userToUpdate = await User.findByIdAndUpdate(id, { username, password, email, isAdmin }, { new: true })
        return userToUpdate
    } catch (error) {
        return error.message;
    }
}

const deleteUser = async (id) => {
    try {
        const userToDelete = await User.softDelete({ _id: id });
        return userToDelete
    } catch (error) {
        return error.message;
    }
}

module.exports = { getUsers, postNewUser, getUserById, getUserByMail, updateUser, deleteUser }