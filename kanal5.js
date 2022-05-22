import cheerio from "cheerio";
import axios from "axios";

const scrapeKanal5 = async () => {
    const response = {};
    const res = await axios.get("https://kanal5.com.mk/");
    const $ = cheerio.load(res.data);
    $(".big-column .articles-container .article .article-image a").each(function (i) {
        response[i] = {link: `https://kanal5.com.mk${$(this).attr("href")}`}
    })

    $(".big-column .articles-container .article .article-image a img").each(function (i) {
        // response[i] = {link: `https://kanal5.com.mk${$(this).attr("href")}`}
        response[i] = {...response[i], image:`https://kanal5.com.mk${$(this).attr("src")}`, content:$(this).attr("alt")}
    })

    return JSON.stringify(response);
}

export default scrapeKanal5;