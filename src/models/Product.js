import mongoose from 'mongoose';

// PI3- Se agrega el campo 'owner' al esquema de Producto
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number,
    id: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export default mongoose.model('Product', productSchema);

