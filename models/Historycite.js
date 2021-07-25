const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryciteSchema = new Schema({
    id_historial: Number,
    dni: Number,
    fecha: Date,
    id_servicio: Number,
    id_mascota: Number,
    valoracion: Number,
});

const Historycite = mongoose.model('Historycite', HistoryciteSchema);

module.exports = Historycite;