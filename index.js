const express = require('express')
const mysql = require('mysql')
const app = express();

//create and verify the link of database
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "123456",
    database: "node_js"
})

//connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Database Connected")
})

//create table
app.get("/createtable", (req, res) => {
    let sql = 'CREATE TABLE post2(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('posts table is created...')
    })
})

//add data in table
app.get("/up", (req, res) => {
    let post = { title: 'vijay1', body: 'vijay text' }
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send("data added to table");
    })
})

//update table
app.get('/updatetable', (req, res) => {
    // let colname = {'title' 'username' VARCHAR(255)}
    let sql = "ALTER TABLE post2 CHANGE 'title' TO 'username' VARCHAR(255)"
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("table column is updated");
    })

})

//server get listen on port address

app.listen('3000', () => {
    console.log("Server Started on 3000")
})