const express=require("express");
const app=express();
const port=process.env.DEV_PORT || 8080;
const cors=require("cors");
const dbConn=require("./db");
const model=require("./model");
var bodyParser = require("body-parser");


var corsOptions = {
    origin: "http://localhost:8080"
  };

app.use(cors(corsOptions));


app.use(express.json());

app.use(express.urlencoded({ extended: false}))

app.use(bodyParser.json());


app.get('/getAll',function(req,res){

        dbConn.query("SELECT `id`, `title`, `content`, `created_date`, `released_year`, `githut_rank`, `pypl_rank`, `tiobe_rank` FROM `programming_languages`", (error, data) => {
        
            if (error) {
          return res.json({ status: "ERROR", error });
        }
    
        return res.json(data)
    });
});

app.get('/get/:id',function(req,res,next){

        var id=req.params.id;

        dbConn.query(`SELECT id, title, content, created_date, released_year, githut_rank, pypl_rank, tiobe_rank FROM programming_languages WHERE id=${id}`,function(error, data){

                if(error){
                    return res.json({status:"Error",error})
                }

                return res.json(data);

    })
})

/***
 *      Model Based Structre for the Destribution of the Code according to code and structre
 * 
 */

app.post('/create',async function(req,res,next){
    
    try {
    
        console.log(req.body);

        var response=await model.createRow(req.body);

        console.log(response);

        return res.json(response);

    } catch (error) {
    
        console.error(`Error while creating programming language`, error.message);
        next(error);
    }

})





app.listen(port,()=>{
    console.log(`running on ${port}`);
})