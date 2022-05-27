import cheerio from "cheerio";
import axios from "axios";

const scrapeInfoMax = async () => {
    const response = {};
    const res = await axios.get("https://infomax.mk/category/%d0%b0%d0%ba%d1%82%d1%83%d0%b5%d0%bb%d0%bd%d0%be/");
    const $ = cheerio.load(res.data);
    $(".svet-list img").each((i,e) => {
        response[i] = {image:$(e).attr("src")};
    })

    $(".svet-list .h4-title-region a").each((i,e) => {
        response[i] = {...response[i], link:$(e).attr("href"), content:$(e).text()}
    })
    response["source"] = "InfoMax";

    return JSON.stringify(response);
}

export default scrapeInfoMax