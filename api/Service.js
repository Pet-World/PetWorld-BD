const express = require("express");
const router = express.Router();

// mongodb Service model
const Service = require("./../models/Service");

cotizacion = {
  estetica: {
    "cepillado de dientes": 100,
    "limpieza de oidos": 50,
  },
};

// Signup
router.post("/createService", (req, res) => {
  let { id_servicio, categoria, especificacion, precio } = req.body;
  categoria = categoria.trim();
  especificacion = especificacion.trim();

  if (especificacion == "" || categoria == "") {
    res.json({
      status: "FAILED",
      message: "Hay campos vacíos!",
    });
  } else {
    let precio = cotizacion[categoria][especificacion];

    Service.find({ id_servicio })
      .then((result) => {
        if (result.length) {
          // A Service already exists
          res.json({
            status: "FAILED",
            message: "Ya existe un servicio con ese ID!",
          });
        } else {
          const newService = new Service({
            id_servicio,
            categoria,
            especificacion,
            precio,
          });

          newService
            .save()
            .then((result) => {
              res.json({
                status: "SUCCESS",
                message: "Servicio creado",
                data: result,
              });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "Ha ocurrido un error al elegir servicio",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message:
            "Se produjo un error al verificar si había un service existente.!",
        });
      });
  }
});

// Signin
router.get("/getService", (req, res) => {
  const id_servicio = req.query.id_servicio;
  Service.find({ id_servicio })
    .then((resultService) => {
      if (resultService.length == 0) {
        // A Service already exists
        res.json({
          status: "FAILED",
          message: "No existe el ID del servicio!",
        });
      } else {
        res.json({
          status: "SUCCESS",
          message: "Servicio obtenido",
          data: resultService,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message:
          "Se produjo un error al verificar si había un id de servicio existente.!",
      });
    });
});

module.exports = router;
