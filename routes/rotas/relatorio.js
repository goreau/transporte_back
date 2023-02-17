var express = require("express")
var app = express();
var router = express.Router();
var RelatorioController = require("../../controllers/RelatorioController");



//relatorios
router.get('/localidade/:mun/:bacia', RelatorioController.relat1);


module.exports = router;