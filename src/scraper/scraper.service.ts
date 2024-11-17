import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async scrapeData(url: string): Promise<any[]> {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the target URL
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract data
    const data = await page.evaluate(() => {
      const articles = [];
      const articleElements = document.querySelectorAll('.product');

      articleElements.forEach((element) => {
        const title = element.querySelector('h2')?.textContent?.trim() || '';
        const price =
          element.querySelector('.price')?.textContent?.trim() || '';

        articles.push({ title, price });
      });

      return articles;
    });

    await browser.close();
    return data;
  }
}
