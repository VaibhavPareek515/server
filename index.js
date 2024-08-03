const express = require("express");
const mysql = require("mysql")
const cors = require("cors");
const bodyParser = require('body-parser');
const {createPool} = require('mysql');

const app = express();
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = createPool({
    host:"bnp6otubtxe8vccczpqp-mysql.services.clever-cloud.com",
    user:"uqlhxbgdbsmclfxk",
    password:"FRezlKyJzaTW08gIk5wb",
    database:"bnp6otubtxe8vccczpqp",
    connectionLimit:5
})


app.get("/",(req,res)=>{
    pool.query("select * from list", (err,result,fields)=> {
        if(err) {
            console.log("error")
            return res.json(err)
        }
        return res.json(result)
    })
})

app.post("/",(req,res)=> {
    pool.query("insert into list (task) values (?)",[req.body.data],(err,result,fields)=> {
        if(err) {
            console.log("error while adding")
            console.log(req.body.data);
            return res.json(err)
        }
        console.log("done while adding")
        return res.json(result);
    })
})

app.delete("/:id",(req,res)=> {
    const tid = req.params.id
    pool.query("delete from list where id = ?",[tid],(err,result,fields)=> {
        if(err) {
            console.log("error while deleting")
            return res.json(err)
        }
        console.log("deleted");
        return res.json("deleted Sucessfully")
    })
})

app.listen(3000,()=> {
    console.log("Server is running");
})
