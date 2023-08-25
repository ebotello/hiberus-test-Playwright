import { Page } from "@playwright/test";

export class WikipediaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getTextByStringOfWikiPage({
    value,
    charLimit = 500,
  }: {
    value: string;
    charLimit?: number;
  }): Promise<string> {
    await this.page.waitForLoadState("networkidle");

    const html = await this.page.innerText("html");

    const textPosisition = html.indexOf(value);

    return html.substr(textPosisition - charLimit, charLimit * 2);
  }

  async saveScreenShot() {
    await this.page.screenshot({ path: "./screenshots/fullpage.png" });

    await this.page.waitForSelector('p:has-text("el primer proceso")');

    const element = await this.page.$('p:has-text("el primer proceso")');

    if (element) {
      await element.screenshot({
        path: "./screenshots/sectionPage.png",
      });
    }
  }
}