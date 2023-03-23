const express = require('express');
const router = express.Router();
const { getProducts, postNewProduct, getProductById, updateProduct, deleteProduct, getProductByName, getProductCategories } = require('../Controllers/productController')
const fileUpload = require('express-fileupload');

/* GET home page. */

router.get('/categories', async (req, res, next) => {
  console.log('hola lucho')
  try {
    const allCategories = await getProductCategories();
    res.status(200).json(allCategories)
  } catch (error) {
    console.error(error)
   return res.status(400).send(error); 
  }
})
router.get('/', async (req, res, next) => {
  console.log('hola dani')
  try {
    if (req.query.name) {
      const foundProduct = await getProductByName(req.query.name)
      if (foundProduct.error) throw new Error(foundProduct.error)
      return res.status(200).json(foundProduct)
    } else {
      const products = await getProducts();
      if (products.error) throw new Error(products.error);
      return res.status(200).json(products)
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/', fileUpload({ useTempFiles: true, tempFileDir: './public/img' }), async (req, res, next) => {
  const { descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness,} = req.body
  try {
    if(!descriptionName || !category || !price || !priceBusiness || !priceVAT || !priceVATBusiness) throw new Error('Falta información del producto!')
    const newProduct = await postNewProduct(req.body, req.files.image.tempFilePath);
    if (newProduct.error) throw new Error(newProduct.error);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
});

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
