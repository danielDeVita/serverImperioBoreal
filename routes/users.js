var express = require('express');
var router = express.Router();
const { getUsers, postNewUser, getUserById } = require('../Controllers/userController')

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

router.get('/:id', async (req, res, next) => {
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
    const newUser = await postNewUser(req.body);
    if (newUser.error) throw new Error(newUser.error);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).send(error)
  }
});

module.exports = router;
