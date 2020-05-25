import { Button } from "./ui";

/** Mocks the Google AppsScript PromptResponse class. */
export class PromptResponse {
  #responseText: string;
  #selectedButton: Button;

  constructor(responseText: string, selectedButton: Button) {
    this.#responseText = responseText;
    this.#selectedButton = selectedButton;
  }

  getResponseText(): string {
    return this.#responseText;
  }

  getSelectedButton(): Button {
    return this.#selectedButton;
  }
}
