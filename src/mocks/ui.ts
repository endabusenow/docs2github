import { Menu } from "./menu";
import { PromptResponse } from "./prompt_response";

export enum ButtonSet {
  OK,
  OK_CANCEL,
  YES_NO,
  YES_NO_CANCEL,
}

export enum Button {
  CLOSE,
  OK,
  CANCEL,
  YES,
  NO,
}

/** Given a ButtonSet, returns the list of cooresponding buttons. */
export function buttonSetToButtons(buttonSet: ButtonSet): Button[] {
  switch (buttonSet) {
    case ButtonSet.OK:
      return [Button.OK];
    case ButtonSet.OK_CANCEL:
      return [Button.OK, Button.CANCEL];
    case ButtonSet.YES_NO:
      return [Button.YES, Button.NO];
    case ButtonSet.YES_NO_CANCEL:
      return [Button.YES, Button.NO, Button.CANCEL];
  }
}

/** Mocks the Google AppsScript Ui class. */
export class Ui {
  static readonly Button = Button;
  static readonly ButtonSet = ButtonSet;
  menus: Menu[] = [];
  addonMenu: Menu | null = null;

  #nextPromptResponseResponseText = "";
  #nextPromptResponseSelectedButton: Button = Button.CLOSE;

  createMenu(caption: string): Menu {
    const menu = new Menu(caption, this);
    return menu;
  }

  createAddonMenu(): Menu {
    return new Menu("", this, /*addon=*/ true);
  }

  // TODO(tylerhou): Consolidate this with setAddonMenu?
  __addMenu(menu: Menu): void {
    if (this !== menu.ui) {
      throw new Error("Added menu must have same Ui");
    }
    if (menu.isAddonMenu) {
      throw new Error("Added menu cannot be addon menu");
    }
    this.menus.push(menu);
  }

  __setAddonMenu(menu: Menu): void {
    if (this !== menu.ui) {
      throw new Error("Added menu must have same Ui");
    }
    if (!menu.isAddonMenu) {
      throw new Error("Menu must be addon menu");
    }
    if (this.addonMenu !== null) {
      throw new Error("Only one addon menu allowed");
    }
    this.addonMenu = menu;
  }

  prompt(prompt: string): PromptResponse;
  prompt(prompt: string, buttons: ButtonSet): PromptResponse;
  prompt(title: string, prompt: string, buttons: ButtonSet): PromptResponse;
  prompt(
    _title: string,
    prompt?: string | ButtonSet,
    buttons?: ButtonSet
  ): PromptResponse {
    if (
      !(prompt === undefined && buttons === undefined) &&
      !(typeof prompt === "string" && typeof buttons === "number") &&
      !(typeof prompt === "number" && buttons === undefined)
    ) {
      throw new Error("Invalid argument combination.");
    }
    if (buttons === undefined) {
      if (prompt === undefined) {
        buttons = ButtonSet.OK;
      } else {
        // This assertion is safe because of the above check.
        buttons = prompt as ButtonSet;
      }
    }

    if (
      !buttonSetToButtons(buttons).includes(
        this.#nextPromptResponseSelectedButton
      )
    ) {
      throw new Error(
        `Button ${this.#nextPromptResponseSelectedButton} not in ButtonSet`
      );
    }

    return new PromptResponse(
      this.#nextPromptResponseResponseText,
      this.#nextPromptResponseSelectedButton
    );
  }

  /** Retrieves a list of menus. This method is for testing and is not in the
   * official API. */
  _getMenus(): Menu[] {
    return this.menus;
  }

  /** Retrieves the addon menu. This method is for testing and is not in the
   * official API. */
  _getAddonMenu(): Menu | null {
    return this.addonMenu;
  }

  /** Clears the menus associated with this UI. This method is for testing and
   * is not in the offical API. */
  _clearMenus(): void {
    this.menus = [];
  }

  /** Sets the text returned by the next call to prompt. This method is testing
   * and is not in the official API. */
  _setNextPromptResponseResponseText(text: string): void {
    this.#nextPromptResponseResponseText = text;
  }

  /** Sets the selected button returned by the next call to prompt. This method
   * is for testing and is not in the official API. */
  _setNextPromptResponseSelectedButton(button: Button): void {
    this.#nextPromptResponseSelectedButton = button;
  }
}
