const express = require("express");
const router = express.Router();

// mongodb Historyshop model
const Historyshop = require("./../models/Historyshop");
const Product = require("./../models/Product");

// Crear producto
router.post("/createHistoryshop", (req, res) => {
    let {
        id_historial,
        cantidadCompra,
        fecha,
        delivery,
        direccion,
        distrito,
        valoracion,
        dni,
        id_producto,
    } = req.body;

    distrito = distrito.trim();
    direccion = direccion.trim();

    if (
        id_historial == "" ||
        cantidadCompra == "" ||
        fecha == "" ||
        dni == "" ||
        id_producto == ""
    ) {
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos",
        });
    } else if (delivery && (direccion == "" || distrito == "")) {
        res.json({
            status: "FAILED",
            message: "Complete la ubicación de la entrega",
        });
    } else if (cantidadCompra < 1) {
        res.json({
            status: "FAILED",
            message: "Cantidad Incorrecta!",
        });
    } else {
        Product.find({ id_producto: id_producto })
            .then((result) => {
                if (result.length == "") {
                    res.json({
                        status: "FAILED",
                        message: "Producto no existe!",
                    });
                } else {
                    const newHistoryShop = new Historyshop({
                        id_historial,
                        cantidadCompra,
                        fecha,
                        delivery,
                        direccion,
                        distrito,
                        valoracion,
                        dni,
                        id_producto,
                    });

                    newHistoryShop
                        .save()
                        .then((result) => {
                            res.json({
                                status: "SUCCESS",
                                message: "Historial de compra creado",
                                data: result,
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: "FAILED",
                                message: "Ha ocurrido un error al crear el historial de compra",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al buscar Producto con ese ID!",
                });
            });
    }
});

// actualizar valoración
router.post("/addValoration", (req, res) => {
    let { id_historial, valoracion } = req.body;
    Historyshop.updateOne({
            id_historial: id_historial,
            valoracion: 0
        }, { valoracion: valoracion })
        .then((result) => {
            res.json({
                status: "SUCCESS",
                message: "Búsqueda completa",
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                status: "FAILED",
                message: "Ha ocurrido un error al actualizar",
            });
        });
});
// Obtener Historial de una compra
router.get("/getHistoryshop", (req, res) => {
    const id_historial = req.query.id_historial;
    Historyshop.find({ id_historial })
        .then((resultHistory) => {
            if (resultHistory.length == 0) {
                res.json({
                    status: "FAILED",
                    message: "No existe el ID del historial!",
                });
            } else {
                res.json({
                    status: "SUCCESS",
                    message: "Historial obtenido",
                    data: resultHistory,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Se produjo un error al verificar si había un id de historial existente.!",
            });
        });
});

// Obtener un Historial de cita
router.get("/getHistoryByDni", (req, res) => {
    const dni = parseInt(req.query.dni);
    Historyshop.find({ dni })
        .then((resultHistory) => {
            if (resultHistory.length == 0) {
                // A Service already exists
                res.json({
                    status: "FAILED",
                    message: "No existe el dni del propietario!",
                });
            } else {
                res.json({
                    status: "SUCCESS",
                    message: "Historiales de compra obtenidos",
                    data: resultHistory,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Se produjo un error al verificar el dni!",
            });
        });
});

module.exports = router;