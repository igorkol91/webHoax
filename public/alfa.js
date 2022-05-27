import cheerio from "cheerio";
import axios from "axios";

const scrapeAlfa = async () => {
    const response = {};
    const res = await axios.get("https://alfa.mk/kategorija/udarni-top/");
    const $ = cheerio.load(res.data);

    $(".row article h3 a").each( (i,e) => {
        response[i] = {content:$(e).text().replace(/^\s+|\s+$|\s+(?=\s)/g, ""), link:$(e).attr("href")};
    })

    $(".row article img").each( (i,e) => {
        response[i] = {...response[i], image:$(e).attr("src")};
    })
    response["source"] = "Alfa";

    return JSON.stringify(response);
}

export default scrapeAlfa;