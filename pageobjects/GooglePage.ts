import { Locator, Page } from "@playwright/test";

export class GooglePage {
  readonly page: Page;
  readonly inputSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputSearch = page.getByLabel("Buscar", { exact: true });
  }

  async goto() {
    await this.page.goto("https://www.google.es");
  }

  async searchValue({ value }: { value: string }) {
    await this.inputSearch.fill(value);
    await this.inputSearch.press("Enter");
  }

  async clickOnTitleResult({ value }: { value: string }): Promise<void> {
    await this.page
      .getByText(value, {
        exact: true,
      })
      .click();
  }
}
