var express = require("express")
var app = express();
var router = express.Router();
var AuxiliaresController = require("../../controllers/AuxiliaresController");


router.get('/municipios', AuxiliaresController.findMunicipios);
router.get('/bacias', AuxiliaresController.findBacia)

module.exports = router;