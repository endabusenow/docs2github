import { Menu } from "./menu";

/** Mocks a Google AppsScript Ui class. */
export class Ui {
  menus: Menu[];

  constructor() {
    this.menus = [];
  }

  createMenu(caption: string) {
    const menu = new Menu(caption, this);
    return menu;
  }

  __addMenu(menu: Menu) {
    if (this !== menu.ui) {
      throw new Error("Added menu must have same Ui");
    }
    this.menus.push(menu);
  }

  /** Retrieves a list of menus. This method is for testing and is not in the
   * official API. */
  _getMenus() {
    return this.menus;
  }
}
