import cheerio from "cheerio";
import axios from "axios";

const scrapeNovaMk = async () => {
    const response = {};
    const res = await axios.get("https://www.novamakedonija.com.mk/");
    const $ = cheerio.load(res.data);

    $(".td-big-grid-wrapper .td-medium-thumb .td-image-wrap img").each(function (i) {
        response[i] = { image:$(this).attr("src"),content:$(this).attr("title") }
    })

    $(".td-big-grid-wrapper .td-medium-thumb .td-image-wrap").each(function (i) {
       response[i] = {...response[i], link:$(this).attr("href")}
    })
    
    return JSON.stringify(response);
}

export default scrapeNovaMk