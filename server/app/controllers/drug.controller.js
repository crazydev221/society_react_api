const config = require("../config/auth.config");


    exports.getDrugs = (req, res) => {

      var mysql = require('mysql2');

   /*   var con = mysql.createConnection({
        host: "wepurple.cscksknsywty.us-east-1.rds.amazonaws.com",
        user: "wepurple",
        password: "wepurple!#",
        database: "wepurple"
      });*/

      var con = mysql.createConnection({
        host: "wepurple.cscksknsywty.us-east-1.rds.amazonaws.com",
        user: "wepurple",
        password: "wepurple!#",
        database: "wepurple"
      });

    con.connect(function(err) {
      if (err) throw err;
      
      var sql = "SELECT * FROM wp_drug_bank LIMIT 5";
      con.query(sql, function (err, result) {
        if (err) throw err;

        return res.status(200).json(result);

        //console.log(result);
      });

      //res.send({ message: "Connected to test database successfully!" });
      //console.log("Connected Database - AMITABH!");
      //return "TRUE";
    });

  };

  exports.searchDrugs = (req, res) => {

    var mysql = require('mysql2');

    var con = mysql.createConnection({
      host: "wepurple.cscksknsywty.us-east-1.rds.amazonaws.com",
      user: "wepurple",
      password: "wepurple!#",
      database: "wepurple"
    });

  con.connect(function(err) {
    if (err) throw err;
    
    var search_text=req.body.search_text;

    var sql = "SELECT * FROM wp_drug_bank where names like '"+search_text+"%' LIMIT 1";
    con.query(sql, function (err, result) {
      if (err) throw err;

      if (!result) {
        return res.status(404).send({ message: "Drugs not found" });
      }

      return res.status(200).json(result);
    });


  });
    
    }; 




    exports.getAutoSuggestDrugs = (req, res) => {

      var mysql = require('mysql2');
  
      var con = mysql.createConnection({
        host: "wepurple.cscksknsywty.us-east-1.rds.amazonaws.com",
        user: "wepurple",
        password: "wepurple!#",
        database: "wepurple"
      });
  
    con.connect(function(err) {
      if (err) throw err;
      
      var search_text=req.body.search_text;
  
      var sql = "SELECT * FROM wp_drug_bank where names like '"+search_text+"%' ORDER BY names LIMIT 50";
      con.query(sql, function (err, result) {
        if (err) throw err;
  
        if (!result) {
          return res.status(404).send({ message: "Drugs not found" });
        }
  
        return res.status(200).json(result);
      });
  
  
    });
      
      }; 