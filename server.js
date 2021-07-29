const config = require('./config/config');

// mongodb
require('./config/db');

const app = require('express')();

const UserRouter = require('./api/User');
const ServiceRouter = require('./api/Service');
const ProductRouter = require('./api/Product');
const HistoryshopRouter = require('./api/Historyshop');
const HistoryciteRouter = require('./api/Historycite');
const PetRouter = require('./api/Pet');
/* 
const HistoryRouter = require('./api/History');
const StadisticRouter = require('./api/Stadistic');
const DiagnosisRouter = require('./api/Diagnosis'); */

// 
//const bodyParser = require('express').json;
//app.use(bodyParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use('/user', UserRouter);
app.use('/service', ServiceRouter);
app.use('/product', ProductRouter);
app.use('/historyshop', HistoryshopRouter);
app.use('/pet', PetRouter);
app.use('/historycite', HistoryciteRouter);
/* app.use('/history', HistoryRouter);
app.use('/stadistic', StadisticRouter);
app.use('/diagnosis', DiagnosisRouter); */


app.listen(config.portExpress, () => {
    console.log(`Servidor corriendo en el puerto ${config.portExpress}`);
})