import 'dotenv/config';
import cors from 'cors';
import express from "express";
import scrapeInfoMax  from "./public/infoMax.js";
import scrapeNovaMk from "./public/novaMk.js";
import scrapeSitel from "./public/sitel.js";
import scrapeKanal5 from "./public/kanal5.js";
import scrapeTelma from "./public/telma.js";
import scrapeAlfa from "./public/alfa.js";

const app = express();

app.use(cors({
    origin: '*'
}));

app.listen(process.env.PORT || "5000", () => {
    console.log("Server running at http://localhost:5000/");
})

app.get("/infomax", async (_,res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(await scrapeInfoMax());
})

app.get("/telma", async (_,res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(await scrapeTelma());
})

app.get("/novamakedonija", async (_,res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(await scrapeNovaMk());
})

app.get("/sitel", async (_,res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(await scrapeSitel());
})

app.get("/kanal5", async (_,res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(await scrapeKanal5());
})

app.get("/alfa", async (_,res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(await scrapeAlfa());
})

app.get("/", async (_,res) => {
    res.end('Main page');
})
