import express from "express";
import scrapeInfoMax  from "./infoMax.js";
import scrapeNovaMk from "./novaMk.js";

const app = express();
const infoMax = await scrapeInfoMax();
const novaMK = await scrapeNovaMk();

app.listen("3000", () => {
    console.log("Server running at http://localhost:3000/");
})


app.get("/infomax", (req,res) => {
    res.end(infoMax);
})

app.get("/novamakedonija", (req,res) => {
    res.end(novaMK);
})


