import express from "express";
import scrapeInfoMax  from "./infoMax.js";
import scrapeNovaMk from "./novaMk.js";
import scrapeSitel from "./sitel.js";
import scrapeKanal5 from "./kanal5.js";

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

app.get("/kanal5", async (_,res) => {
    res.end(await scrapeKanal5());
})
