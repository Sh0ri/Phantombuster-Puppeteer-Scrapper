"phantombuster command: nodejs"
"phantombuster package: 5"
"phantombuster flags: save-folder"

import Buster from "phantombuster";
import { Browser, launch } from 'puppeteer';

import { isHTMLFrameElement } from './lib-typeGuards';
import getAllRestaurantsInfos from './lib-scrapper';

const buster = new Buster();

const scrapTheFork = async (url: string, browser: Browser) => {
  console.log('>> SCRAPPING STARTED');
  const page = await browser.newPage(); 
  await page.goto(
    url,
    { waitUntil: 'load' },
  );
  await page.screenshot({ path: 'pre-captcha.png', fullPage: true });   
  // await buster.saveText(await page.content(), 'page.html'); // debug purpose

  /* find the frame where the captcha is */
  const frames = await page.frames();
  const captchaFrame = frames.find(f => f.url().includes('datado'));
  if (!isHTMLFrameElement(captchaFrame)) throw new Error('Frame is unparsable');

  /* get the captcha token */
  const captchaToken = await captchaFrame.evaluate((): null | string => {
    const isHTMLInputElement = (elem: any): elem is HTMLInputElement => (elem instanceof HTMLInputElement);
    const isNull = (elem: any): elem is null => (elem === null); 

    const captchaElement = document.querySelector("#captcha-submit");
    if (isNull(captchaElement) || !isHTMLInputElement(captchaElement)) return null;
    if (captchaElement.hasAttribute('data-sitekey')) {
      const token = captchaElement.getAttribute('data-sitekey') as string;
      return token;
    }
    return null;
  });
  
  if (!captchaToken) throw new Error('Unparsable token');

  /* solve the captcha */
  console.log('>> CAPTCHA IS BEEING DECODED');
  const captchaResult = await buster.solveNoCaptcha(captchaFrame.url(), captchaToken);
  console.log(">> CAPTCHA SOLUTION TOKEN:", captchaResult);

  /* inject the captcha solution */
  if(!await captchaFrame.evaluate((result): boolean => {
    const isHTMLTextAreaElement = (elem: any): elem is HTMLTextAreaElement => (elem instanceof HTMLTextAreaElement);
    const isNull = (elem: any): elem is null => (elem === null);

    const captchaElement = document.querySelector("#g-recaptcha-response");

    if (isNull(captchaElement) || !isHTMLTextAreaElement(captchaElement)) return false;
    (captchaElement as HTMLTextAreaElement).innerHTML = result;
    return true;
    
  }, captchaResult)) throw new Error('Couldnt set captcha result');

  /* wait for the navigation */
  await page.waitForNavigation();
  // await page.screenshot({ path: 'afterclick.png', fullPage: true }); // debug purpose

  /* launch the scrapping */
  const resultingRestaurants = await page.evaluate(getAllRestaurantsInfos);
  await buster.setResultObject(resultingRestaurants);
  await browser.close();
  process.exit(0);
};

/**
 * main function of the phantom
 *
 * @param {string[]} args
 */
const launchScrapping = (args: string[]): void => {
  const toScrap = args[2];
  launch({ 
    headless: true, 
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ],
  })
    .then((browser: Browser) => scrapTheFork(toScrap, browser))
    .catch(printErrorAndExit); 
};

/**
 * print an Error and exit the process
 *
 * @param {Error} e
 */
const printErrorAndExit = (e: Error) => {
  console.log(`An error occured: ${e}`);
  process.exit(1);
};

launchScrapping(process.argv);