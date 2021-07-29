const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryshopSchema = new Schema({
    id_historial: Number,
    cantidadCompra: Number,
    fecha: Date,
    delivery: Boolean,
    direccion: String,
    distrito: String,
    valoracion: Number,
    dni: Number,
    id_producto: Number,
});

const Historyshop = mongoose.model('Historyshop', HistoryshopSchema);

module.exports = Historyshop;