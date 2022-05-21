import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();
const response = {};

app.listen("3000", () => {
    console.log("Server running at http://localhost:3000/");
})

const res = await axios.get("https://infomax.mk/category/%d0%b0%d0%ba%d1%82%d1%83%d0%b5%d0%bb%d0%bd%d0%be/");
const $ = cheerio.load(res.data);
$(".svet-list img").each(function (i) {
    response[i] = {image:$(this).attr("src")};
})

$(".svet-list .h4-title-region a").each(function (i) {
    response[i] = {...response[i], link:$(this).attr("href"), content:$(this).text()}
})

app.get("/infomax", (req,res) => {
    res.end(JSON.stringify(response));
})


