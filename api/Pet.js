const express = require("express");
const router = express.Router();

// mongodb user model
const Pet = require("./../models/Pet");

// Registrar mascota
router.post("/registerpet", (req, res) => {
    let { id_mascota, dni, edad, nombre, pelaje, raza, sexo, tamano } = req.body;
    nombre = nombre.trim();

    if (
        dni == "" ||
        edad == "" ||
        nombre == "" ||
        pelaje == "" ||
        raza == "" ||
        sexo == "" ||
        tamano == ""
    ) {
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos!",
        });
    } else {
        // Registrar mascota
        const newPet = new Pet({
            id_mascota,
            dni,
            edad,
            nombre,
            pelaje,
            raza,
            sexo,
            tamano,
        });

        newPet
            .save()
            .then((result) => {
                res.json({
                    status: "SUCCESS",
                    message: "Registro satisfactorio",
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    status: "FAILED",
                    message: "Ha ocurrido un error mientras se guardaban los datos del usuario!",
                });
            });
    }
});

// Obtener una Mascota
router.get("/getPet", (req, res) => {
    const id_mascota = req.query.id_mascota;
    Pet.find({ id_mascota })
        .then((resultPet) => {
            if (resultPet.length == 0) {
                // A Service already exists
                res.json({
                    status: "FAILED",
                    message: "No existe el ID de la mascota!",
                });
            } else {
                res.json({
                    status: "SUCCESS",
                    message: "Mascota obtenido",
                    data: resultPet,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Se produjo un error al verificar si había un id de mascota existente!",
            });
        });
});

module.exports = router;