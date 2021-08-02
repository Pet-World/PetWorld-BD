const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    id_mascota: Number,
    dni: Number,
    edad: Number,
    nombre: String,
    pelaje: String,
    raza: String,
    sexo: String,
    tamano: String,
    tipo: String,
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;