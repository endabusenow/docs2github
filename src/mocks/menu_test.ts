import { Ui } from "./ui";
import { Menu } from "./menu";

describe("Menu", () => {
  test("add items to the menu", () => {
    const ui = new Ui();
    const menu = ui.createMenu("menu caption");
    menu.addItem("first", "menuFunction");
    menu.addSeparator();

    const submenu = ui.createMenu("submenu caption");
    menu.addSubMenu(submenu);

    const items = menu._getItems();
    expect(items).toHaveLength(3);

    {
      const [item, separator, submenu] = items;
      expect(item.brand == "MenuItem" && item.caption == "first").toBe(true);
      expect(separator.brand == "Separator").toBe(true);
      expect(
        submenu.brand == "Menu" && submenu.caption == "submenu caption"
      ).toBe(true);
    }
  });

  test("click menu item", () => {
    const ui = new Ui();
    const menu = ui.createMenu("caption");
    menu.addItem("foo", "menuFunction");

    const item = menu._getItems()[0];
    expect(item.brand == "MenuItem").toBe(true);
    if (item.brand !== "MenuItem") {
      throw new Error("item is not MenuItem");
    }

    const mockCallback = jest.fn();
    global.menuFunction = mockCallback;
    item._click();
    expect(mockCallback.mock.calls).toHaveLength(1);
  });

  test("addToUi", () => {
    const ui = new Ui();
    const menu = ui.createMenu("caption");
    menu.addToUi();

    expect(ui._getMenus()).toHaveLength(1);
  });

  test("can only be added once", () => {
    const ui = new Ui();
    const menu = ui.createMenu("caption");
    menu.addToUi();

    expect(() => menu.addToUi()).toThrowError("once");
  });

  test("can't addToUi then be added to submenu", () => {
    const ui = new Ui();
    const menu = ui.createMenu("menu");
    const submenu = ui.createMenu("submenu");

    submenu.addToUi();
    expect(() => menu.addSubMenu(submenu)).toThrowError("once");
  });

  test("can't be added to submenu then addToUi", () => {
    const ui = new Ui();
    const menu = ui.createMenu("menu");
    const submenu = ui.createMenu("submenu");

    menu.addSubMenu(submenu);
    expect(() => submenu.addToUi()).toThrowError("once");
  });

  test("can only add submenu once", () => {
    const ui = new Ui();
    const menu = ui.createMenu("menu");
    const submenu = ui.createMenu("submenu");

    menu.addSubMenu(submenu);
    expect(() => menu.addSubMenu(submenu)).toThrowError("once");
  });

  test("can only add submenus with the same parent Ui", () => {
    const firstUi = new Ui();
    const secondUi = new Ui();

    const firstMenu = firstUi.createMenu("foo");
    const secondMenu = secondUi.createMenu("bar");

    expect(() => firstMenu.addSubMenu(secondMenu)).toThrowError("same");
  });

  describe("addon menu", () => {
    test("create and add", () => {
      const ui = new Ui();
      ui.createAddonMenu().addItem("foo", "bar").addToUi();

      const addonMenu: Menu | null = ui._getAddonMenu();
      expect(addonMenu).not.toBeNull();
      if (addonMenu === null) {
        throw new Error("Expected addon menu not to be null");
      }
      expect(addonMenu._getItems()).toHaveLength(1);
    });

    test("can only add one addon menu", () => {
      const ui = new Ui();
      ui.createAddonMenu().addItem("foo", "bar").addToUi();
      const second = ui.createAddonMenu().addItem("bar", "baz");
      expect(() => second.addToUi()).toThrowError("Only one");
    });

    test("addon menu can only be added once", () => {
      const ui = new Ui();
      const menu = ui.createAddonMenu().addItem("foo", "bar");
      menu.addToUi();
      expect(() => menu.addToUi()).toThrowError("once");
    });
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      menuFunction: () => void;
    }
  }
}
