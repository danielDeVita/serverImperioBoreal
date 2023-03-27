const express = require('express');
const router = express.Router();
const { getUsers, postNewUser, getUserById, getUserByMail, updateUser, deleteUser } = require('../Controllers/userController')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    if (users.error) throw new Error(users.error)
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.get("/:email", async (req, res, next) => {
  try {
    const foundUser = await getUserByMail(req.params.email);
    if (foundUser.error) throw new Error(foundUser.error)
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(404).send(error.message)
  }
})

router.get('/id/:id', async (req, res, next) => {
  try {
    const foundUser = await getUserById(req.params.id);
    if (foundUser.error) throw new Error(foundUser.error)
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(404).send(error.message)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body
    const newUser = await postNewUser(email);
    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, email, userRole } = req.body
    const userToUpdate = await updateUser(id, username, password, email, userRole);
    if (userToUpdate.error) throw new Error(userToUpdate.error);
    return res.status(201).json(userToUpdate);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await deleteUser(id)
    return res.status(200).json(userToDelete)
  } catch (error) {
    return res.status(400).send(error);
  }
})

module.exports = router;
