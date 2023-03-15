const Product = require('../models/Product')

const getProducts = async() => {
    try {
        const products = await Product.find()
        if(!products.length)
        throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error) {
        return error.message;
    }
}

const postNewProduct = async (product) => {
    try {
        if (!product.descriptionName || !product.category || !product.price || !product.priceBusiness || !product.priceVAT || !product.priceVATBusiness) throw new Error("Falta información acerca del producto");
        const newProduct = new Product(product)
        newProduct.save(newProduct)
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

const deleteProduct = async (id) => {
    try {
        const productToDelete = await Product.softDelete({ _id: id });
        return productToDelete
    } catch (error) {
        return error.message;
    }
}



module.exports = { getProducts, postNewProduct, getProductById, deleteProduct }
