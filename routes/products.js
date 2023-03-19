const express = require('express');
const router = express.Router();
const { getProducts, postNewProduct, getProductById, updateProduct, deleteProduct, getProductByName } = require('../Controllers/productController')

const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadFile = multer({ storage });

/* GET home page. */
router.get('/', async (req, res, next) => {
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

router.post('/', uploadFile.single('productImg'), async (req, res, next) => {
  try {
    //const fileName = path.basename(req.file.path);
    console.log(req.file);
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
