const express = require('express');
const router = express.Router();
const { getProducts, postNewProduct, getProductById, updateProduct, deleteProduct, getProductByName, getProductCategories } = require('../Controllers/productController')
const fileUpload = require('express-fileupload');

/* GET home page. */

router.get('/categories', async (req, res, next) => {
  try {
    const allCategories = await getProductCategories();
    res.status(200).json(allCategories)
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get('/', async (req, res, next) => {
  try {
    if (req.query.name) {
      const foundProduct = await getProductByName(req.query.name)
      if (foundProduct.error) throw new Error(foundProduct.error)
      return res.status(200).json(foundProduct)
    } else {
      const products = await getProducts();
      if (products.error) throw new Error(products.error);
      const serialaizerProducts = products?.map((item) => (
        {
          image: item.image,
          _id: item._id,
          descriptionName: item.descriptionName,
          category: {
            _id: item?.category?._id,
            categoryName: item.category.category
          },
          price: item.price,
          stock: item.stock
        }
      ))
      return res.status(200).json(serialaizerProducts)
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post('/', fileUpload({ useTempFiles: true, tempFileDir: './public/img' }), async (req, res, next) => {
  try {
    const newProduct = await postNewProduct(req.body, req.files.image.tempFilePath);
    if (newProduct.error) throw new Error(newProduct.error);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).send(error.message)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const foundProduct = await getProductById(req.params.id);
    if (foundProduct.error) throw new Error(foundProduct.error)
    const serialaizer = {
      image: foundProduct.image,
      _id: foundProduct._id,
      descriptionName: foundProduct.descriptionName,
      category: {
        _id: foundProduct.category._id,
        categoryName: foundProduct.category.category
      },
      price: foundProduct.price,
      stock: foundProduct.stock
    }
    return res.status(200).json(serialaizer);
  } catch (error) {
    return res.status(404).send(error.message)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descriptionName, category, price, stock } = req.body
    const productToUpdate = await updateProduct(id, descriptionName, category, price, stock);
    if (productToUpdate.error) throw new Error(productToUpdate.error);
    return res.status(201).json(productToUpdate);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productToDelete = await deleteProduct(id)
    return res.status(200).json(productToDelete)
  } catch (error) {
    return res.status(400).send(error.message);
  }
})


module.exports = router;
