const {createPool} = require('mysql');

const pool = createPool({
    host:"bnp6otubtxe8vccczpqp-mysql.services.clever-cloud.com",
    user:"uqlhxbgdbsmclfxk",
    password:"FRezlKyJzaTW08gIk5wb",
    database:"bnp6otubtxe8vccczpqp",
    connectionLimit:5
})

pool.query("select * from list", (err,result,fields)=> {
    console.log("Working")
    if(err) {
        return console.log(err)
    }

    return console.log(result)
})