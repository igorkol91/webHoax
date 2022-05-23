import cheerio from "cheerio";
import axios from "axios";

const scrapeNovaMk = async () => {
    const response = {};
    const res = await axios.get("https://www.novamakedonija.com.mk/");
    const $ = cheerio.load(res.data);

    $(".td-big-grid-wrapper .td-medium-thumb .td-image-wrap img").each((i,e) => {
        response[i] = { image:$(e).attr("src"),content:$(e).attr("title") }
    })

    $(".td-big-grid-wrapper .td-medium-thumb .td-image-wrap").each((i,e) =>{
       response[i] = {...response[i], link:$(e).attr("href")}
    })
    
    return JSON.stringify(response);
}

export default scrapeNovaMk