import cheerio from "cheerio";
import axios from "axios";

const scrapeAlfa = async () => {
    const response = {};
    const res = await axios.get("https://alfa.mk/kategorija/udarni-top/");
    const $ = cheerio.load(res.data);

    $(".row article h3 a").each( (i,e) => {
        response[i] = {content:$(e).text(), link:$(e).attr("href")};
    })

    $(".align-items-center .read-bg-img a").each( (i,e) => {
        if($(e).children('img').length){
            response[i] = {
                ...response[i],
                image:$(e).children('img').attr("src"),
                sourceLogo:"https://alfa.mk/wp-content/uploads/Webp.net-resizeimage-4.png"
            };
        }
        else {
            response[i] = {...response[i], image:"",source:"Alfa"};
        }
        
        
    })

    return JSON.stringify(response);
}

export default scrapeAlfa;