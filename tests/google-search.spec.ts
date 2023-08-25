import { test, expect } from "@playwright/test";
import { GooglePage, WikipediaPage } from "../pageobjects";

import { OpenAIUtils } from "../utils";

test("Search 'Automatización' word in google.", async ({ page }) => {
  page.on("console", (msg: any) => {
    if (msg.type() === "info") console.log(msg);
  });

  const googlePage = new GooglePage(page);
  const wikipediaPage = new WikipediaPage(page);
  const openAIUtils = new OpenAIUtils();

  const charLimitForWikipediaText = 100;

  await googlePage.goto();
  await googlePage.searchValue({ value: "Automatización" });

  await googlePage.clickOnTitleResult({
    value: "Automatización - Wikipedia, la enciclopedia libre",
  });

  const wikipediaText = await wikipediaPage.getTextByStringOfWikiPage({
    charLimit: charLimitForWikipediaText,
    value: "el primer proceso",
  });

  expect(
    wikipediaText.length,
    `Chequear que e tamaño del contenxto wikipedia sea ${
      charLimitForWikipediaText * 2
    }`
  ).toBe(charLimitForWikipediaText * 2);

  const completion = await openAIUtils.sendQuestion([
    {
      role: "user",
      content: wikipediaText,
    },
    {
      role: "user",
      content:
        "segun el texto anterior en que año paso el primer proceso automatico pero responde solo con el numero del año",
    },
  ]);

  expect(
    completion.choices[0]?.message?.content,
    "La primera automatizacion en el texto sea 1785"
  ).toBe("1785");

  await wikipediaPage.saveScreenShot();
});