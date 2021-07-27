const express = require("express");
const router = express.Router();

// mongodb Product model
const Product = require("./../models/Product");


// Crear producto
router.post("/createProduct", (req, res) => {
    let { id_producto, nombre, categoria, marca, precio, imagen } = req.body;
    categoria = categoria.trim();
    nombre = nombre.trim();
    marca = marca.trim();

    if (categoria == "" || nombre == "" || marca == "") {
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos!",
        });
    } else {
        Product.find({ id_producto })
            .then((result) => {
                if (result.length) {
                    // A Product already exists
                    res.json({
                        status: "FAILED",
                        message: "Ya existe un producto con ese ID!",
                    });
                } else {
                    const newProduct = new Product({
                        id_producto,
                        nombre,
                        categoria,
                        marca,
                        precio,
                        imagen
                    });

                    newProduct
                        .save()
                        .then((result) => {
                            res.json({
                                status: "SUCCESS",
                                message: "Producto creado",
                                data: result,
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: "FAILED",
                                message: "Ha ocurrido un error al crear producto",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al verificar si había un producto existente!",
                });
            });
    }
});



// Obtener Producto
router.get("/getProduct", (req, res) => {
    const id_product = req.query.id_product;
    Product.find({ id_product })
        .then((resultProduct) => {
            if (resultProduct.length == 0) {
                // A Product already exists
                res.json({
                    status: "FAILED",
                    message: "No existe el ID del producto!",
                });
            } else {
                res.json({
                    status: "SUCCESS",
                    message: "Producto obtenido",
                    data: resultProduct,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Se produjo un error al verificar si había un id de producto existente.!",
            });
        });
});

module.exports = router;