const express = require("express");
const router = express.Router();

// mongodb user model
const User = require("./../models/User");

// Password handler
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", (req, res) => {
    let {
        dni,
        apellidos,
        cantidadMascotas,
        celular,
        direccion,
        distrito,
        email,
        password,
        nombres,
    } = req.body;
    apellidos = apellidos.trim();
    direccion = direccion.trim();
    distrito = distrito.trim();
    email = email.trim();
    password = password.trim();
    nombres = nombres.trim();

    if (
        dni == "" ||
        apellidos == "" ||
        cantidadMascotas == "" ||
        celular == "" ||
        email == "" ||
        password == "" ||
        nombres == ""
    ) {
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos!",
        });
    } else if (!/^[a-zA-Z ]*$/.test(nombres)) {
        res.json({
            status: "FAILED",
            message: "Nombre inválido",
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Correo inválido",
        });
    } else if (password.length < 6) {
        res.json({
            status: "FAILED",
            message: "Contraseña muy corta!",
        });
    } else {
        // Checking if user already exists
        User.find({ dni })
            .then((result) => {
                if (result.length) {
                    // A user already exists
                    res.json({
                        status: "FAILED",
                        message: "Ya existe un usuario con ese dni!",
                    });
                } else {
                    // Try to create new user

                    // password handling
                    const saltRounds = 10;
                    bcrypt
                        .hash(password, saltRounds)
                        .then((hashedPassword) => {
                            const newUser = new User({
                                dni,
                                apellidos,
                                cantidadMascotas,
                                celular,
                                direccion,
                                distrito,
                                email,
                                password: hashedPassword,
                                nombres,
                            });

                            newUser
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
                        })
                        .catch((err) => {
                            res.json({
                                status: "FAILED",
                                message: "Se produjo un error al hacer hash de la contraseña!",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al verificar si había un usuario existente.!",
                });
            });
    }
});

// Signin
router.post("/signin", (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Credenciales vacías",
        });
    } else {
        // Check if user exist
        User.find({ email })
            .then((resultUser) => {
                if (resultUser.length == 0) {
                    // A user already exists
                    res.json({
                        status: "FAILED",
                        message: "El usuario no existe!",
                    });
                } else {
                    const hashedPassword = resultUser[0].password;
                    bcrypt
                        .compare(password, hashedPassword)
                        .then((result) => {
                            if (result) {
                                // Password match
                                res.json({
                                    status: "SUCCESS",
                                    message: "Inicio de sesión satisfactorio",
                                    data: resultUser,
                                });
                            } else {
                                res.json({
                                    status: "FAILED",
                                    message: "Contraseña inválida!",
                                });
                            }
                        })
                        .catch((err) => {
                            res.json({
                                status: "FAILED",
                                message: "Ocurrió un error mientras se comparaban las contraseñas",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al verificar si había un usuario existente.!",
                });
            });
    }
});

module.exports = router;