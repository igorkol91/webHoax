import cheerio from "cheerio";
import axios from "axios";

const scrapeSitel = async () => {
    const response = {};
    const res = await axios.get("https://sitel.com.mk/");
    const $ = cheerio.load(res.data);

    $(".views-field .field-content .image img").each((i,e) => {
        response[i] = {image:$(e).attr("src")};
    })

    $(".views-field .field-content .title-wrapper a").each((i,e) => {
        response[i] = {
            ...response[i],
            content:$(e).html(),
            link:`https://sitel.com.mk/${$(e).attr("href")}`,
            sourceLogo: "https://sitel.com.mk/sites/all/themes/sitel/logo.png"
        };
    })


     return JSON.stringify(response);
}

export default scrapeSitel;