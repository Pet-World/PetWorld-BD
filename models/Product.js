const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id_producto: Number,
    nombre: String,
    categoria: String,
    marca: String,
    precio: Number,
    imagen: String,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;