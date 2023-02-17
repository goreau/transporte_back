//const { config } = require('dotenv');
var bodyParser = require('body-parser')
var express = require("express")
const cors = require('cors')

var app = express()
var router = require("./routes/routes")
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors());

//app.options('*', cors());



//
/*app.use(function(req, res, next) {
  console.log('cors');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

app.use("/api",router);

/*app.listen(process.env.PORT,process.env.BASE_URL,() => {
  console.log("Servidor rodando...")
  console.log(process.env)
});*/

app.listen(8686,() => {
    console.log("Servidor rodando...")
});
