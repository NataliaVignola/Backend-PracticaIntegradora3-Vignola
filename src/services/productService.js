import ProductsModel from "../models/Product.js"


export const getProductsService = async (limit, category, sort)=>{
    try {

        if(category == 'all'){
            if(limit <= 10){
                const products = await ProductsModel.find().skip(0).limit(limit).sort({price: sort})
    
                if(products.length <= 0) throw {name: 'db error', httpcode: 500, description: 'No se encontraron productos'}
                
                return products
            }else{
                const sking = limit - 10
                const products = await ProductsModel.find().skip(sking).limit(limit).sort({price: sort})
                if(products.length <= 0) throw {name: 'db error', httpcode: 500, description: 'Limit ingresado no es valido o es muy grande'}
                
                return products
            }
        }else{
            if(limit <= 10){
                const products = await ProductsModel.find({category: category}).skip(0).limit(limit).sort({price: sort})
    
                if(products.length <= 0) throw {name: 'db error', httpcode: 500, description: 'No se encontraron productos'}
                
                return products
            }else{
                const sking = limit - 10
                const products = await ProductsModel.find({category: category}).skip(sking).limit(limit).sort({price: sort})
                if(products.length <= 0) throw {name: 'db error', httpcode: 500, description: 'No se encontraron productos'}
                
                return products
            }
        }

    } catch (error) {
        throw error
    }
}


export const getProductByIdService = async (id)=>{
    try {
        const product = await ProductsModel.findById(id)

        if(!product) throw {name: 'client error', httpcode: 404, description: 'Producto no encontrado'}

        return product
    } catch (error) {
        throw error
    }
}

export const setNewProductService = async (title, description, price, thumbnail, code, stock, category, owner) => {
    try {
        const newProduct = new Product({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            owner, // PI3 - Asignar el owner del producto
        });
    } catch (error) {
        throw error
    }
}

export const updateProductService = async (id, newData)=>{
    try {
        const updateProduct = await ProductsModel.findByIdAndUpdate(id, newData)

        if(updateProduct.length <= 0) throw {name: 'client error', httpcode: 500, description: 'Error en update product service'}

        return updateProduct
    } catch (error) {
        throw error
    }
}

export const deleteProductService = async (id)=>{
    try {
        const deleteProduct = await ProductsModel.findByIdAndDelete(id)

        return deleteProduct
    } catch (error) {
        throw error
    }
}

