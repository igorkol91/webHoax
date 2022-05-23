import puppeteer from 'puppeteer';

const telma = async () => {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://telma.com.mk/kategorija/%d0%b2%d0%b5%d1%81%d1%82%d0%b8/makedonija/');
    await autoScroll(page);
    await page.screenshot({
        path: 'yoursite.png'
    });

    const data = await page.evaluateHandle(() => document.querySelector('.popular-posts-sr').shadowRoot.querySelector('ul').outerHTML);
    // const data = await page.evaluate(() => document.querySelector('.popular-posts-sr'));

    console.log(data);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
};

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
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

export default telma;