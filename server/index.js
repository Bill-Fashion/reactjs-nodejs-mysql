const express = require("express");
const PORT = 5000;
const mysql = require('mysql');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sql =  `SELECT * FROM student WHERE StudentID = ?`
    db.query(sql, username, (err, result) => {
        if(err) throw err;
        if (result) {
            if (username === password && username === result[0].StudentID) {
                res.status(200).json({
                    message: "Login success",
                    data: result[0]
                })
            }  else {
                res.status(401).json({
                    message: "Fail to login"
                })
            }
        } else {
            res.status(401).json({ 
                message: "Fail to login"
            })
        }
        
})})
app.get('/courses', (req, res) => {
    let sql =  `SELECT * FROM course`
    db.query(sql, (err, result) => {
        if(err) throw err;
        if (result) {
            res.status(200).json({
                message: "Get courses success",
                data: result
            })
        } else {
            res.status(401).json({ 
                message: "Fail to get courses"
            })
        }
        
})})
app.post('/courses', (req, res) => {
    const { studentID, coursesID } = req.body;
    let studentCourses = [];
    coursesID.forEach(courseID => {
        studentCourses.push([studentID, courseID])
    });

    let sql =  "INSERT INTO studentcourse (Student_ID, Course_ID) VALUES ?";
    db.query(sql, [studentCourses], (err, result) => {
        if(err) {
            res.status(500).json({
                error: err.message
            })
            throw err;
        };
        res.status(201).json({
            message: "Register courses success",
        })
    })
})
app.get('/student/courses/', (req, res) => {
    const studentID = req.query.id;
    let sql =  `SELECT s.*, c.*
                FROM student s
                INNER JOIN studentcourse b ON s._id = b.Student_ID
                INNER JOIN course c ON b.Course_ID = c._ID
                WHERE s._ID = ?`
    db.query(sql, studentID, (err, result) => {
        if(err) throw err;
        if (result) {
            res.status(200).json({
                message: "Get courses success", 
                data: result
            })
        } else {
            res.status(401).json({ 
                message: "Fail to get courses"
            })
        }
        
})
})
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}) 