import { Ui } from "./ui";

class MenuItem {
  brand: "MenuItem" = "MenuItem";
  caption: string;
  functionName: string;

  // functionName breaks syntax highlighting, probably because of "function".
  constructor(caption: string, fnName: string) {
    this.caption = caption;
    this.functionName = fnName;
  }

  /** Calls the function associated with this MenuItem. This method is for
   * testing and not in the official API. */
  _click() {
    (global as any)[this.functionName]();
  }
}

interface Separator {
  brand: "Separator";
}

/** Mocks the Google AppsScript Menu class.
 * https://developers.google.com/apps-script/reference/base/menu
 */
export class Menu {
  brand: "Menu" = "Menu";
  caption: string;
  items: Array<MenuItem | Menu | Separator>;
  added = false;
  isAddonMenu: boolean;
  ui: Ui;

  constructor(caption: string, ui: Ui, isAddonMenu: boolean = false) {
    this.caption = caption;
    this.items = [];
    this.ui = ui;
    this.isAddonMenu = isAddonMenu;
  }

  addItem(caption: string, functionName: string): Menu {
    const item: MenuItem = new MenuItem(caption, functionName);
    this.items.push(item);
    return this;
  }

  addSeparator(): Menu {
    const separator: Separator = { brand: "Separator" };
    this.items.push(separator);
    return this;
  }

  addSubMenu(submenu: Menu): Menu {
    submenu.__checkAndAdd();
    if (this.ui !== submenu.ui) {
      throw new Error("Menu and submenu must have same parent Ui");
    }
    this.items.push(submenu);
    return this;
  }

  addToUi(): void {
    this.__checkAndAdd();
    if (this.isAddonMenu) {
      this.ui.__setAddonMenu(this);
    } else {
      this.ui.__addMenu(this);
    }
  }

  /** Returns the list of items. This method is for testing and is not in in
   * the official API. */
  _getItems(): Array<MenuItem | Menu | Separator> {
    return this.items;
  }

  __checkAndAdd(): void {
    if (this.added) {
      throw new Error("Can only add menu once");
    }
    this.added = true;
  }
}
