const Product = require('../models/Product')

const getProducts = async() => {
    try {
        const products = await Product.find()
<<<<<<< HEAD
        if(!products.length)
=======
        if(!products.lenght)
>>>>>>> 026702cfd57a6fa8897888f72fc095aac448b094
        throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error) {
        return error.message;
    }
}

<<<<<<< HEAD
module.exports = {getProducts}
=======
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



module.exports = { getProducts, postNewProduct }
>>>>>>> 026702cfd57a6fa8897888f72fc095aac448b094
