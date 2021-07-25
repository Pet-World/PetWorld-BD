const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    dni: Number,
    apellidos: String,
    cantidadMascotas: Number,
    celular: Number,
    direccion: String,
    distrito: String,
    email: String,
    password: String,
    nombres: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;