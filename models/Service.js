const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    id_servicio: Number,
    categoria: String,
    especificacion: String,
    precio: Number,
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;