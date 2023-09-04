const dbConn=require("./db");

async function createRow(inputArray){

    // console.log("inputArray");
    // console.log(inputArray);

    let createObj={
    title:inputArray.title,
    content:inputArray.content,
    released_year:inputArray.released_year,
    githut_rank:inputArray.githut_rank,
    pypl_rank:inputArray.pypl_rank,
    tiobe_rank:inputArray.tiobe_rank
    }

    const result=await dbConn.query(`INSERT INTO programming_languages(title, content,released_year, githut_rank, pypl_rank, tiobe_rank) VALUES ('${createObj.title}','${createObj.content}','${createObj.released_year}',${createObj.githut_rank},${createObj.pypl_rank},${createObj.tiobe_rank})`);

    let message="Error while Inserting Records in Programming Language";

    if(result){
        message="Inserted Records into Programming Language";
    }

    return {message}

}

module.exports={
    createRow
}