const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school_management_system'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// insert subject
app.post("/subject", (req, res) => {

    let sql =
    `INSERT INTO subjects(name) VALUES ('${req.body.name}')`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return res.send({
          error: 1,
          ...error,
        });
      }
      res.send({ error: 0, message: "Subject Inserted" });
    });
 
});

// insert teacher
app.post("/teacher", (req, res) => {

    let sql =
    `INSERT INTO teachers(name,salary,subject_id) VALUES ('${req.body.name}','${req.body.salary}','${req.body.subject_id}')`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return res.send({
          error: 1,
          ...error,
        });
      }
      res.send({ error: 0, message: "Teacher Record Inserted" });
    });
 
});


// insert student
app.post("/student", (req, res) => {

    let sql =
    `INSERT INTO students(name,teacher_id,subject_id) VALUES ('${req.body.name}','${req.body.teacher_id}','${req.body.subject_id}')`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return res.send({
          error: 1,
          ...error,
        });
      }
      res.send({ error: 0, message: "Student Record Inserted" });
    });
 
});






app.listen(8000, () => console.log("Server started on port 8000"));