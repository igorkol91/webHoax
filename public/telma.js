import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const scrapeTelma = async () => {
  try {
    const response = {}
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://telma.com.mk/kategorija/%d0%b2%d0%b5%d1%81%d1%82%d0%b8/makedonija/');
    await autoScroll(page);

    const data = await page.evaluateHandle(() => document.querySelector('.popular-posts-sr').shadowRoot.querySelector('ul').outerHTML);
    await browser.close();
    const $ = cheerio.load(data._remoteObject.value);

    $("ul li div .wpp-post-title").each((i, e) => {
        response[i] = {link: `${$(e).attr("href")}`, content: $(e).html()}
    })

    $("ul li img").each((i, e) => {
        response[i] = {...response[i], image: $(e).attr('src')}
    })

    return JSON.stringify(response);
  } catch (err) {
    console.error(err);
  }
};

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 10000;
            const timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

export default scrapeTelma;