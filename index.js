import express from "express";
import scrapeInfoMax  from "./infoMax.js";
import scrapeNovaMk from "./novaMk.js";
import scrapeSitel from "./sitel.js";

const app = express();



app.listen("3000", () => {
    console.log("Server running at http://localhost:3000/");
})

app.get("/infomax", async (_,res) => {
    res.end(await scrapeInfoMax());
})

app.get("/novamakedonija", async (_,res) => {
    res.end(await scrapeNovaMk());
})

app.get("/sitel", async (_,res) => {
    res.end(await scrapeSitel());
})


