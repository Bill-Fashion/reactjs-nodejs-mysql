const db = require("../db_connection/mysql_connection")

module.exports = {
    login: async (req, res) => {
        // const { username, password } = req.body;
        try {
            let connection = await db();
            let sql =  `SELECT * FROM student`
            connection.query(sql, (err, result) => {
                if(err) throw err;
                console.log(result);
            })
            res.send("Get success")
        } catch (error) {
            res.send(error)
        }
    }
}