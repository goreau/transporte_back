var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");

var AdminAuth = require("../middleware/AdminAuth");

router.use("/localidades", require("./rotas/localidade"));
router.use("/auxiliares", require("./rotas/auxiliar"));
router.use("/relatorios", require("./rotas/relatorio"));
router.use("/users", require("./rotas/user"));

router.get('/', HomeController.index);
router.post('/validate', AdminAuth, HomeController.validate);

router.get('*',function(req, res){
    res.send("Caminho não encontrado");
})

module.exports = router;