const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    id_mascota: Number,
    apellidos: String,
    cantidadMascotas: Number,
    celular: Number,
    direccion: String,
    distrito: String,
    email: String,
    password: String,
    nombres: String,
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;