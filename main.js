const express = require('express');
const app = express();
const mysql = require('mysql');
const conn = mysql.createConnection({     //데이터베이스 연결 객체
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'attend'
});

app.use(express.json()); //body-parser 의역할? json request 받을때 필요함
conn.connect(); // 데이터베이스 커넥션

app.get("/", (req,res) => { //Root 경로
    res.type('application/json');
    var data = {msg: "Root"};
    res.send(data);
});

app.get("/attend", (req,res) => { //모든리스트
    res.type('application/json');
    conn.connect();
    conn.query("select * from attend" , (err,rows,fields) => {          
        if(err) throw err;
        res.send(rows);
    });
    conn.end();
});

app.post("/attend", (req,res)=> { //회원가입하는 API
    res.set({'Content-Type':'application/json; charset=utf-8'});    

    let data = {};

    let id = req.body.id;
    let pass = req.body.pass;
    let name = req.body.name;
    let level = req.body.level;

    conn.query(`INSERT INTO user (id,pass,name,level) VALUES ("${id}","${pass}","${name}",${level})`, (err, rows ,field)=>{        
        if(err) {
            throw err;
        }
        data = {};  // 빈값으로 초기화
        data["msg"] = "Good" //data 에 추가 추가 가능
        data["code"] = 123; // => 
        res.send(data);
    });    
});

app.get("/attend/:id", (req,res)=>{ //하나의 회원정보를 가져오는 API
    let id = req.params.id;
    let data = {};
    data['msg'] = "Good";
    conn.query(`SELECT * FROM user WHERE id='${id}' limit 1`, (err,rows,field)=>{
        data['data'] = rows[0];
        res.send(data);
    });
    
});

app.put("/attend/:id",(req, res) => {
    let id = req.params.id;
    let data = {};
    data['msg'] = `${id} 님의 회원수정이 완료되었다`;
    let pass = req.body.pass;
    let name = req.body.name;
    let level = req.body.level;
    let sql = `UPDATE user SET pass='${pass}', name='${name}', level=${level} WHERE id='${id}'`;
    
    conn.query(sql, (err, rows, field)=>{        
        console.log(rows);        
        res.send(data);
    });
    
});


app.listen(5000, () => {console.log("5000번포트로 서버활성화");});

