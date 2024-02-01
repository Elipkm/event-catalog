import puppeteer from 'puppeteer';
import fs from 'fs';
import { Quelle } from '../model/quelleModel';
import path from 'path';
import { Clip } from '../model/clipModel';


export async function takeScreenshots(quellen: Quelle[], continueOnError: boolean) {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  for (let i = 0; i < quellen.length; i++) {
    console.log('Screenshotting ' + quellen[i].name);

    try {
      if(quellen[i]?.viewport_width != undefined && quellen[i]?.viewport_height != undefined){
        let vW = quellen[i].viewport_width as number;
        let vH = quellen[i].viewport_height as number;
        await page.setViewport({ width: vW, height: vH });
      }
      await page.goto(quellen[i].url);

      let outputDirectory = 'data/katalog/quelle/id-' + quellen[i].id;
      const absoluteFilePath = path.join(process.cwd(), outputDirectory);
      createSubdirectory(absoluteFilePath);

      if(quellen[i].fullPage) {
        await takeFullPageScreenshot(page, absoluteFilePath, quellen[i]?.optimizeSpeed);
      } else {
        if(quellen[i]?.clip){
          if(quellen[i]?.multipleClips){
            let numClipsX = quellen[i]?.targetNumberOfClipsX ? quellen[i]?.targetNumberOfClipsX as number : 1;
            let numClipsY = quellen[i]?.targetNumberOfClipsY ? quellen[i]?.targetNumberOfClipsY as number : 1;
            await takeMultipleClipsPageScreenshot(page, absoluteFilePath, quellen[i].clip as Clip, numClipsX, numClipsY, quellen[i]?.optimizeSpeed);
          } else {
            await takeClipPageScreenshot(page, absoluteFilePath, quellen[i]?.clip, quellen[i]?.optimizeSpeed);
          }
        }
      }
      
    } catch (error) {
        console.log("Could not take screenshots for " + quellen[i].name);
        if(continueOnError){
          console.log(error);
        } else {
          throw error;
        }
    }
  }

  console.log('Finished latest Eventkatalog!');

  await browser.close();
}


function createSubdirectory(directory: any) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true });
  }
  fs.mkdirSync(directory, { recursive: true });

}

async function takeFullPageScreenshotsWithClip(page: any, outputDirectory: any, screenshotHeight: any, optimizeForSpeed: boolean = false) {
  const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

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
      optimizeForSpeed: optimizeForSpeed
    });

    if (i < numScreenshots - 1) {
      await page.evaluate(() => {
        window.scrollTo(0, window.scrollY + window.innerHeight);
      });

      await page.waitForTimeout(200);
    }
  }
}

async function takeFullPageScreenshot(page: any, outputDirectory: any, optimizeForSpeed: boolean = false) {
  await page.screenshot({ path: outputDirectory + "/" + `screenshot_full.png`, fullPage: true, optimizeForSpeed: optimizeForSpeed });
}

async function takeClipPageScreenshot(page: any, outputDirectory: any, clip: any, optimizeForSpeed: boolean = false) {
  await page.screenshot({ 
    path: outputDirectory + "/" + `screenshot_clip.png`, 
    fullPage: false, 
    clip: clip, 
    optimizeForSpeed: optimizeForSpeed 
  });
}
async function takeMultipleClipsPageScreenshot(page: any, outputDirectory: any, clip: Clip, numClipsX: number, numClipsY: number, optimizeForSpeed: boolean = false) {
  for(let iY = 0; iY < numClipsY; iY++){
    for (let iX = 0; iX < numClipsX; iX++) {
      console.log("Screenshotting clip X: " + (iX + 1) + " Y: " + (iY + 1));
      let newClip = {
          x: clip.x + iX * clip.width,
          y: clip.y + iY * clip.height,
          width: clip.width,
          height: clip.height
      }
      console.log(JSON.stringify(newClip, null, 2));
      await page.screenshot({
        path: outputDirectory + "/" + `clip_X_Y_${iX + 1}_${iY + 1}.png`,
        fullPage: false,
        clip: {
          x: clip.x + iX * clip.width,
          y: clip.y + iY * clip.height,
          width: clip.width,
          height: clip.height,
        },
        optimizeForSpeed: optimizeForSpeed
      });
      // perhaps we need scrolling here
    }
  }

}


