import cheerio from "cheerio";
import axios from "axios";

const scrapeKanal5 = async () => {
    const response = {};
    const res = await axios.get("https://kanal5.com.mk/");
    const $ = cheerio.load(res.data);
    $(".big-column .articles-container .article .article-image a").each((i,e) => {
        response[i] = {link: `https://kanal5.com.mk${$(e).attr("href")}`}
    })

    $(".big-column .articles-container .article .article-image a img").each((i,e) => {
        response[i] = {...response[i], image:`https://kanal5.com.mk${$(e).attr("src")}`, content:$(e).attr("alt"),source:"Kanal5"}
    })

    return JSON.stringify(response);
}

export default scrapeKanal5;