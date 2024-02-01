import puppeteer from 'puppeteer';
import fs from 'fs';
import { Quelle } from '../model/quelleModel';
import path from 'path';


export async function takeScreenshots(quellen: Quelle[]) {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  //await page.setViewport({ width: 720, height: 1600 });

  for (let i = 0; i < quellen.length; i++) {
    console.log('Screenshotting ' + quellen[i].name);

    try {
      await page.goto(quellen[i].url);

      let outputDirectory = 'data/katalog/quelle/id-' + quellen[i].id;
      const absoluteFilePath = path.join(process.cwd(), outputDirectory);
      createSubdirectory(absoluteFilePath);
      await takeFullPageScreenshots(page, absoluteFilePath, 1600);
      
    } catch (error) {
        console.log("Could not take screenshots for " + quellen[i].name);
        console.log(error);
    }

    /*let screenshotPath = subDir + "/" + quelleName + "_" + (i+1) + '.png';
    await page.screenshot({ path: screenshotPath, fullPage: true }); */
  }

  console.log('Finished latest Eventkatalog!');

  // Close the browser
  await browser.close();
}


function createSubdirectory(directory: any) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true });
  }
  fs.mkdirSync(directory, { recursive: true });

}

async function takeFullPageScreenshots(page: any, outputDirectory: any, screenshotHeight: any) {
  const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  await page.setViewport({ width: 1600, height: 1600 });

  const numScreenshots = Math.ceil(height / screenshotHeight);

  for (let i = 0; i < numScreenshots; i++) {
    const clipHeight = Math.min(screenshotHeight, height - i * screenshotHeight);

    await page.screenshot({
      path: outputDirectory + "/" + `screenshot_${i + 1}.png`,
      fullPage: false,
      clip: {
        x: 0,
        y: i * screenshotHeight,
        width: page.viewport().width,
        height: clipHeight,
      },
    });

    if (i < numScreenshots - 1) {
      await page.evaluate(() => {
        window.scrollTo(0, window.scrollY + window.innerHeight);
      });

      await page.waitForTimeout(200);
    }
  }
}

