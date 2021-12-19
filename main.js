const express = require('express');
const app = express();
const mysql = require('mysql');
const conn = mysql.createConnection({     //데이터베이스 연결 객체
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'attend'
});

app.use(express.json());

app.get("/", (req,res) => {
    res.type('application/json');
    var data = {msg: "Root"};
    res.send(data);
});

app.get("/attend", (req,res) => {
    res.type('application/json');
    conn.connect();
    conn.query("select * from attend" , (err,rows,fields) => {          
        if(err) throw err;
        res.send(rows);
    });
    conn.end();
});

app.post("/attend", (req,res)=> {
    res.set({'Content-Type':'application/json; charset=utf-8'});    

    let data = {};

    let id = req.body.id;
    let pass = req.body.pass;
    let name = req.body.name;
    let level = req.body.level;

    conn.connect();
    conn.query(`INSERT INTO user (id,pass,name,level) VALUES ("${id}","${pass}","${name}",${level})`, (err, rows ,field)=>{        
        if(err) {
            console.log(err);
        }
        data = {};  // 빈값으로 초기화
        data["msg"] = "Good" //data 에 추가 추가 가능
        data["code"] = 123; // => 
        res.send(data);
    });    
});

app.listen(5000, () => {console.log("5000번포트로 서버활성화");});