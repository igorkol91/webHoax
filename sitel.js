import cheerio from "cheerio";
import axios from "axios";

const scrapeSitel = async () => {
    const response = {};
    const res = await axios.get("https://sitel.com.mk/");
    const $ = cheerio.load(res.data);

    $(".views-field .field-content .image img").each((i,e) => {
        response[i] = {image:$(e).attr("src")};
    })

    $(".views-field .field-content .title-wrapper a").each(function (i) {
        response[i] = {...response[i], content:$(this).html(), link:`https://sitel.com.mk/${$(this).attr("href")}`};
    })

     return JSON.stringify(response);
}

export default scrapeSitel;