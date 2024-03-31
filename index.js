import express from "express";
import ejs from "ejs";
import pg from "pg";
import bodyParser from "body-parser";


const db = new pg.Client({
    user:"postgres",
    database:"Notes",
    host:"localhost",
    password:"Suabay12@",
    port:"5432"
});



const app= express();
const port = 3000;
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", async(req,res)=>{
    const result = await db.query("SELECT * FROM notes ORDER BY id ASC");
    var notes = result.rows;
    console.log(notes);

    res.render("home.ejs",{ItemLists:notes});
});




app.post("/add",async(req,res)=>{
    const title = req.body["inputF"];
    const content = req.body["texta"];
    await db.query("INSERT INTO notes (title,content) VALUES($1,$2)",[title,content]);



    res.redirect("/")

});


app.post("/delete",async(req,res)=>{
    const id = req.body["deleteItemId"];
    await db.query("DELETE FROM notes WHERE id=$1",[id]);
    res.redirect("/")
});





app.listen(port,()=>{
    console.log("App is running in Port "+port);
});
