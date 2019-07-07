"use strict";
"phantombuster command: nodejs";
"phantombuster package: 5";
"phantombuster flags: save-folder";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phantombuster_1 = __importDefault(require("phantombuster"));
const puppeteer_1 = require("puppeteer");
const buster = new phantombuster_1.default();
const scrapTheForkResultPage = async (browser) => {
    console.log('>> SCRAPPING STARTED');
    const URL = 'https://www.lafourchette.com/recherche/paris/415144?searchText=&idRestaurant=&idGooglePlace=&locality=&googlePlaceType=&geolocated=&fromSearchBar=1&date=2019-07-19&time=19%3A30%3A00&pax=2&titleSubstitute=&localeCode=FR&productLineId=&foodTypeTag=429&coordinate=&sb=1&is_restaurant_autocomplete=0';
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'load' });
    await page.screenshot({ path: 'myscreenshot.png', fullPage: true });
    await buster.saveText(await page.content(), 'html');
    try {
        const frames = await page.frames();
        const captchaFrame = frames.find(f => f.url().includes('datado'));
        const iframeURL = captchaFrame.url();
        const captchaToken = await captchaFrame.evaluate(() => {
            const captchaDOM = document.querySelector("#captcha-submit");
            if (captchaDOM !== null && captchaDOM.hasAttribute('data-sitekey')) {
                const token = captchaDOM.getAttribute('data-sitekey');
                return token;
            }
        });
        if (!captchaToken)
            throw new Error();
        console.log('>> CAPTCHA IS BEEING DECODED');
        const result = await buster.solveNoCaptcha(iframeURL, captchaToken);
        console.log(">> CAPTCHA RESPONSE:", result);
        await captchaFrame.evaluate((result) => {
            const captchaDOM = document.querySelector("#g-recaptcha-response");
            if (captchaDOM !== null) {
                captchaDOM.innerHTML = result;
            }
        }, result);
        console.log('>> FINDING GOOGLE FRAME');
        const googleIFrame = frames.find(f => f.url().includes('www.google.com/recaptcha'));
        console.log('>> CLICKING CATPCHA VALIDATION BUTTON', googleIFrame);
        await googleIFrame.click('#recaptcha-anchor');
        await delay(3000);
        // await page.waitForNavigation();
        await page.screenshot({ path: 'myscreenshot2.png', fullPage: true });
    }
    catch (err) {
        console.log("Could not solve reCAPTCHA:", err);
        await browser.close();
        throw new Error(err);
    }
    await browser.close();
    // let results: IScrapperResult = [];
    // for(let i = 0; i < 5; i++) {
    //   const newResto: IRestaurant = {
    //     name : "",
    //     address: "??",
    //     imageUrl: "??",
    //     averagePrice: -1,
    //     grade: {
    //       average: 10,
    //       opinionNumber: 100,
    //     },
    //     restaurantType: 'whatever',
    //   };
    //   results.push(newResto);
    // } 
    // buster.setResultObject(results);
};
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
const launchScrapping = () => {
    puppeteer_1.launch({
        headless: true,
        args: ["--no-sandbox"],
    })
        .then(scrapTheForkResultPage)
        .catch(printErrorAndExit);
};
const printErrorAndExit = (e) => {
    console.log(`An error occured: ${e}`);
    process.exit(1);
};
launchScrapping();
