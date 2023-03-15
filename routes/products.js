var express = require('express');
var router = express.Router();
const { getProducts } = require('../Controllers/productController')

/* GET home page. */
router.get('/', async(req, res, next) => {
    try {
      const products = await getProducts();
      if(products.error) throw new Error(products.error);
      return res.status(200).json(products)
    } catch (error) {
      return res.status(400).send(error);
    }
});

module.exports = router;
