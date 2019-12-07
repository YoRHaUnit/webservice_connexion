var express = require('express');
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser')

/* GET users listing. */
router.use(cors());
router.use(express.json())
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }))

/*router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/



router.post('/', function(req, res) {
  var mysql = require('mysql');
  console.log('Get connection ...');
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  console.log(req.body)

  var conn = mysql.createConnection({
    database: 'projetwebservicesconnexion',
    host: "localhost",
    user: "root",
    password: ""
  });

  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var req2 = "INSERT INTO user (login,password,prenom,nom,email) VALUE('"+req.body.login+"','"+req.body.password+"','"+req.body.prenom+"','"+req.body.nom+"','"+req.body.email+"')";
    conn.query(req2, function(err,fields){
      if (err) throw err;
    });
  });
});


router.get('/connexion/:id/:mdp', function(req,res){
    var mysql = require('mysql');
    console.log('Get connection ...');
    res.setHeader('Content-Type', 'text/plain')
    console.log(req.params.id);
    console.log(req.params.mdp);

    var conn = mysql.createConnection({
        database: 'projetwebservicesconnexion',
        host: "localhost",
        user: "root",
        password: ""
    });

    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        //var req2 = "INSERT INTO user (login,password,prenom,nom,email) VALUE('salut','salut','salut','salut','salut')";
        var req2 = "SELECT COUNT(*) as test FROM user WHERE login = '"+ req.params.id +"' AND password = '"+ req.params.mdp +"'";
        conn.query(req2, function(err,fields){
            if (err) throw err;
            else {
                if (fields[0].test != 0) {
                    console.log("test1");
                    res.json({bool : 'true'});
                }
                else {
                    console.log("test2");
                    res.json({bool : 'false'});
                }

            }
        });
    });
})

module.exports = router;
