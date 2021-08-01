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
            imagen,
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
          message:
            "Se produjo un error al verificar si había un producto existente!",
        });
      });
  }
});

// Crear producto
router.post("/createProducts", (req, res) => {
  let arrayProducts = req.body;

  for (let i = 0; i < arrayProducts.length; i++) {
    let { id_producto, nombre, categoria, marca, precio, imagen } =
      arrayProducts[i];
    categoria = categoria.trim();
    nombre = nombre.trim();
    marca = marca.trim();

    if (categoria == "" || nombre == "" || marca == "") {
      res.json({
        status: "FAILED",
        message: `Producto con ID ${id_producto} tiene campos vacíos!`,
      });
      break;
    } else {
      Product.find({ id_producto })
        .then((result) => {
          if (result.length) {
            res.json({
              status: "FAILED",
              message: `Ya existe un producto con el ID ${id_producto}!`,
            });
          } else {
            const newProduct = new Product({
              id_producto,
              nombre,
              categoria,
              marca,
              precio,
              imagen,
            });

            newProduct
              .save()
              .then((result) => {
                process.stdout.write(`Producto con ID ${id_producto} creado`);
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
              })
              .catch((err) => {
                console.log(`El producto con ID ${id_producto} no pudo ser creado`, err);
                res.json({
                  status: "FAILED",
                  message: `El producto con ID ${id_producto} no pudo ser creado`,
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message:
              `Se produjo un error al verificar si había un producto existente con el ID ${id_producto}`
          });
        });
    }

    if(i == (arrayProducts.length - 1)){
        res.json({
            status: "SUCCESS",
            message: "Productos creados",
        });
    }
  }
});

// Obtener Producto
router.get("/getProduct", (req, res) => {
  const id_producto = req.query.id_producto;
  Product.find({ id_producto })
    .then((resultProduct) => {
      if (resultProduct.length == 0) {
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
        message:
          "Se produjo un error al verificar si había un id de producto existente.!",
      });
    });
});

router.get("/getProducts", (req, res) => {
  Product.find({})
    .then((resultProduct) => {
      if (resultProduct.length == 0) {
        res.json({
          status: "FAILED",
          message: "registro vacio!",
        });
      } else {
        res.json({
          status: "SUCCESS",
          message: "Productos obtenido",
          data: resultProduct,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Error al obtener productos",
      });
    });
});

module.exports = router;
