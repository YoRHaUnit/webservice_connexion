var express = require('express');
var router = express.Router();
var cors = require('cors');


/* GET users listing. */
router.use(cors());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  //res.send({id:1});
  var mysql = require('mysql');
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('Get connection ...');

  var conn = mysql.createConnection({
    database: 'projetwebservicesconnexion',
    host: "localhost",
    user: "root",
    password: ""
  });

  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var req1 = "select * from user";
    conn.query(req1, function(err,rows,fields){
      if (err) throw err;
      console.log("L'utilisateur est : ", rows[0])
      res.send(rows[0])
    });

    var req2 = "INSERT INTO user (login,password,prenom,nom,email) VALUE('pierrick','pierrick','pierrick','pierrick','pierrick')";
    conn.query(req2, function(err,fields){
      if (err) throw err;
    });
  });
});

module.exports = router;
