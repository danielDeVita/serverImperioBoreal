const fs = require('fs-extra');
const { uploadImage, deleteImage } = require('../cloudinary');
const Product = require('../models/Product')
const Category = require('../models/Category')

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
    const { descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness,} = product;
    try {
        let categoryObj = await Category.findOne({category})
        if(!categoryObj) {
            categoryObj = await Category.create({ category })            
        }
        const newProduct = new Product({
            descriptionName: descriptionName,
            categoryId: categoryObj._id,
            price: price,
            priceBusiness: priceBusiness,
            priceVAT: priceVAT,
            priceVATBusiness: priceVATBusiness,
        })
        if (imgPath) {
            const result = await uploadImage(imgPath)
            newProduct.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(imgPath);
        }
        const savedProduct = await newProduct.save()
        return savedProduct
    } catch (error) {
        console.log('estoy en el catch')
       throw new Error(error.message)
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
        const productToGetPublicID = await Product.findById(id)
        const productToDelete = await Product.softDelete({ _id: id });
        await deleteImage(productToGetPublicID.image.public_id);
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

const getProductCategories = async () => {
    try {
        const allCategories = await Category.find({});
        if (!allCategories) throw new Error ('No se encontraron categorías en la DB');
        return allCategories;
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = { getProducts, postNewProduct, getProductById, deleteProduct, updateProduct, getProductByName, getProductCategories }
