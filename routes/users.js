var express = require('express');
var router = express.Router();
const { getUsers } = require('../Controllers/userController')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    if(users.error) throw new Error(users.error)
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).send(error)
  }
});

module.exports = router;
