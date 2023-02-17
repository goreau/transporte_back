var express = require("express")
var app = express();
var router = express.Router();
var LocalidadeController = require("../../controllers/LocalidadeController");

var AdminAuth = require("../../middleware/AdminAuth");

router.post('/localidade', LocalidadeController.create);
router.get('/localidade/:mun/:bacia', LocalidadeController.index);
router.get('/localidade/:id', LocalidadeController.findLocalidade);
router.put('/localidade', AdminAuth, LocalidadeController.edit);


module.exports = router;