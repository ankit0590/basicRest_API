const mysql=require("mysql");
const dbConfig=require("./config/db.config"); 


const connection=mysql.createConnection({

    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB

});

connection.connect(res=>{
    if (res) throw res; 
    console.log("Databace successfully Connected");
});

module.exports=connection;