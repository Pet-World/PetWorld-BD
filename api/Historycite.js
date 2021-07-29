const express = require("express");
const router = express.Router();

// mongodb Historycite model
const Historycite = require("./../models/Historycite");
const Service = require("./../models/Service");

// Crear Servicio
router.post("/createHistorycite", (req, res) => {
    let {
        id_historial,
        dni,
        fecha,
        id_servicio,
        id_mascota,
        valoracion,
    } = req.body;

    if (
        id_historial == "" ||
        fecha == "" ||
        dni == "" ||
        id_servicio == ""
    ) {
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos",
        });
    } else {
        Service.find({ id_servicio: id_servicio })
            .then((result) => {
                if (result.length == "") {
                    res.json({
                        status: "FAILED",
                        message: "Servicio no existe!",
                    });
                } else {
                    const newHistorycite = new Historycite({
                        id_historial,
                        dni,
                        fecha,
                        id_servicio,
                        id_mascota,
                        valoracion,
                    });

                    newHistorycite
                        .save()
                        .then((result) => {
                            res.json({
                                status: "SUCCESS",
                                message: "Historial de cita creado",
                                data: result,
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: "FAILED",
                                message: "Ha ocurrido un error al crear el historial de cita",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al buscar Serviceo con ese ID!",
                });
            });
    }
});

// actualizar valoración
router.post("/addValoration", (req, res) => {
    let { id_historial, valoracion } = req.body;
    Historycite.updateOne({
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
// Obtener Historial de una cita
router.get("/getHistorycite", (req, res) => {
    const id_historial = req.query.id_historial;
    Historycite.find({ id_historial })
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

module.exports = router;