const express = require("express");
const router = express.Router();

// mongodb Service model
const Service = require("./../models/Service");

cotizacion = {
  medicina_preventiva: {
    "chequeos medicos preventivos": 100,
    "analisis de laboratorio": 80,
    ecografia: 100,
    microchips: 50,
    "snaps de descarte de Parvovirosis": 60,
    "snaps de descarte de distemper": 70,
    "snaps de descarte Sida": 60,
  },
  medicina_interna: {
    "placas de Rayos X": 100,
    traumatologia: 80,
    "profilaxis dental": 70,
    "citologias de masas, oidos y piel": 90,
    histopatologias: 80,
    "otoscopias digitales": 60,
    "rinoscopias digitales": 80,
  },
  estetica: {
    "baño y perfumado": 100,
    "corte de uñas": 50,
    "limpieza de oidos": 70,
    "cepillado de dientes": 40,
    "limpieza de glandulas anales": 200,
    "cepillado y desenredado de pelaje": 80,
    "reacondicionamiento de pelaje": 150,
  },
};

// Crear servicio
router.post("/createService", (req, res) => {
  let { id_servicio, categoria, especificacion } = req.body;
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
                message: "Ha ocurrido un error al crear servicio",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message:
            "Se produjo un error al verificar si había un servicio existente!",
        });
      });
  }
});

router.post("/createServices", (req, res) => {
  let arrayServices = req.body;

  for (let i = 0; i < arrayServices.length; i++) {
    let { id_servicio, categoria, especificacion } = arrayServices[i];
    categoria = categoria.trim();
    especificacion = especificacion.trim();

    if (categoria == "" || especificacion == "") {
      res.json({
        status: "FAILED",
        message: `Servicio con ID ${id_servicio} tiene campos vacíos!`,
      });
      break;
    } else {
      let precio = cotizacion[categoria][especificacion];

      Service.find({ id_servicio })
        .then((result) => {
          if (result.length) {
            res.json({
              status: "FAILED",
              message: `Ya existe un servicio con el ID ${id_servicio}!`,
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
                process.stdout.write(`Servicio con ID ${id_servicio} creado`);
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
              })
              .catch((err) => {
                console.log(
                  `El servicio con ID ${id_servicio} no pudo ser creado`,
                  err
                );
                res.json({
                  status: "FAILED",
                  message: `El servicio con ID ${id_servicio} no pudo ser creado`,
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: `Se produjo un error al verificar si había un servicio existente con el ID ${id_servicio}`,
          });
        });
    }

    if (i == arrayServices.length - 1) {
      res.json({
        status: "SUCCESS",
        message: "Servicios creados",
      });
    }
  }
});

// Obtener servicio de acuerdo al id
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
          "Se produjo un error al verificar si había un id de servicio existente!",
      });
    });
});

module.exports = router;
