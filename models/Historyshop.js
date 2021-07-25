const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryshopSchema = new Schema({
    id_historial: Number,
    cantidadCompra: Number,
    distrito: String,
    fecha: Date,
    valoracion: String,
    Dni: String,
    id_producto: String,
});

const Historyshop = mongoose.model('Historyshop', HistoryshopSchema);

module.exports = Historyshop;