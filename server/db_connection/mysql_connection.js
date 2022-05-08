const mysql = require('mysql');

module.exports = () => 
new Promise((resolve, reject) => {
    const db = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "Mymysql1201*",
        database: 'lab4-schema',
        port: '3306'
      });
      
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
})