var express = require('express');
var router = express.Router();
const { getProducts, postNewProduct, getProductById, updateProduct, deleteProduct} = require('../Controllers/productController')

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

router.get('/:id', async (req, res, next) => {
  try {
    const foundProduct = await getProductById(req.params.id);
    if (foundProduct.error) throw new Error(foundProduct.error)
    return res.status(200).json(foundProduct);
  } catch (error) {
    return res.status(404).send(error.message)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness } = req.body
    const productToUpdate = await updateProduct(id, descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness);
    if (productToUpdate.error) throw new Error(productToUpdate.error);
    return res.status(201).json(productToUpdate);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productToDelete = await deleteProduct(id)
    return res.status(200).json(productToDelete)
  } catch (error) {
    return res.status(400).send(error);
  }
})

module.exports = router;
