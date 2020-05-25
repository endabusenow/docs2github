import { Menu } from "./menu";

/** Mocks a Google AppsScript Ui class. */
export class Ui {
  menus: Menu[];
  addonMenu: Menu | null = null;

  constructor() {
    this.menus = [];
  }

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
}
