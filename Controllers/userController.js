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

const postNewUser = async (email) => {
    try {
        const foundUser = await User.findOne({ email })
        if (foundUser) return foundUser;
        const newUser = new User({
            email,
            username: email
        })
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

const updateUser = async (id, first_name, password, email) => {
    try {
        const userToUpdate = await User.findByIdAndUpdate(id, { first_name, password, email, }, { new: true })
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