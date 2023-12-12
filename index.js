// Importing Required modeules

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//creating express server
const app = express();
const port = 3000;

//  declaring public as a static file
app.use(express.static("public"));

// using required middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());


// getting request from home page on running server
app.get("/", (req,res)=>{
    res.render("index.ejs");
});

//getting request from another servers
app.get("/random_dogs", (req,res)=>{
    res.render("index.ejs");
});


app.post("/random_dogs", async(req,res)=>{

    // parsing data 
    const breedInput = req.body.breedInput;
    const dog_selector = req.body.dog_selector;

    // try block to run code
    try{
        let breed = breedInput;
        if(breedInput == "" || !(dog_selector == "")){
            breed = dog_selector;
        }
        console.log(breed);
        const result = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        console.log(result.data.message);
        res.render("index.ejs",{ link : result.data.message });

    // catch block for catching errors
    }catch(error){
        res.render("index.ejs", {link : "Could Not Load"});
    }
});

// listening requests from designated port
app.listen(port, (req,res)=>{
    console.log(`Your app is running on port: ${port}`);
});