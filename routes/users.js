var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send({id:1});
  var mysql = require('mysql');

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
    });

    var req2 = "INSERT INTO user (login,password,prenom,nom,email) VALUE('pierrick','pierrick','pierrick','pierrick','pierrick')";
    conn.query(req2, function(err,fields){
      if (err) throw err;
    });


  });
});

module.exports = router;
