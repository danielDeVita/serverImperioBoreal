const fs = require('fs-extra');
const { uploadImage, deleteImage } = require('../cloudinary');
const Product = require('../models/Product')

const getProducts = async () => {
    try {
        const products = await Product.find()
        if (!products.length)
            throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error) {
        return error.message;
    }
}

const postNewProduct = async (product, imgPath) => {
    try {
        if (!product.descriptionName || !product.category || !product.price || !product.priceBusiness || !product.priceVAT || !product.priceVATBusiness) throw new Error("Falta información acerca del producto");
        const newProduct = new Product(product)
        if (imgPath) {
            const result = await uploadImage(imgPath)
            newProduct.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(imgPath);
        }
        await newProduct.save(newProduct)
        return newProduct
    } catch (error) {
        return error.message;
    }
}

const getProductById = async (id) => {
    try {
        const foundProduct = await Product.findById(id);
        if (!foundProduct) throw new Error('No hay producto con ese id');
        return foundProduct;
    } catch (error) {
        return error.message;
    }
}

const updateProduct = async (id, descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness) => {
    try {
        const productToUpdate = await Product.findByIdAndUpdate(id, { descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness, }, { new: true })
        return productToUpdate
    } catch (error) {
        return error.message;
    }
}
const deleteProduct = async (id) => {
    try {
        const productToDelete = await Product.softDelete({ _id: id });
        await deleteImage(productToDelete.public_id);
        return productToDelete
    } catch (error) {
        return error.message;
    }
}

const getProductByName = async (name) => {
    try {
        const responseDB = await Product.findOne({ descriptionName: name });
        if (!responseDB) throw new Error("No se encontro el producto buscado");
        return responseDB
    } catch (error) {
        return error.message;
    }
};



module.exports = { getProducts, postNewProduct, getProductById, deleteProduct, updateProduct, getProductByName }
