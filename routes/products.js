var express = require('express');
var router = express.Router();
const { getProducts, postNewProduct } = require('../Controllers/productController')

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

router.post('/', async(req, res, next) => {
  try {
    const newProduct = await postNewProduct(req.body);
    if (newProduct.error) throw new Error(newProduct.error);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).send(error)
  }
})

module.exports = router;
