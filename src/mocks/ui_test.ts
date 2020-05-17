import { Ui } from "./ui";

describe("Ui", () => {
  test("add menu", () => {
    const ui = new Ui();
    expect(ui._getMenus()).toHaveLength(0);

    const menu = ui.createMenu("foo");
    expect(ui._getMenus()).toHaveLength(0);

    menu.addToUi();
    expect(ui._getMenus()).toHaveLength(1);
  });

  test("click menu", () => {
    const ui = new Ui();
    const menu = ui.createMenu("foo");
    menu.addItem("bar", "menuFunction");
    menu.addToUi();

    const mockCallback = jest.fn();
    global.menuFunction = mockCallback;
    const item = ui._getMenus()[0]._getItems()[0];

    expect(item.brand === "MenuItem").toBe(true);
    if (item.brand !== "MenuItem") {
      fail();
    }

    item._click();
    expect(mockCallback.mock.calls).toHaveLength(1);
  });

  test("click submenu", () => {
    const ui = new Ui();
    const menu = ui.createMenu("foo");

    const submenu = ui.createMenu("bar");
    submenu.addItem("baz", "menuFunction");

    menu.addSubMenu(submenu);
    menu.addToUi();

    const mockCallback = jest.fn();
    global.menuFunction = mockCallback;
    const sub = ui._getMenus()[0]._getItems()[0];

    expect(sub.brand === "Menu").toBe(true);
    if (sub.brand !== "Menu") {
      fail();
    }

    const item = sub._getItems()[0];
    expect(item.brand === "MenuItem").toBe(true);
    if (item.brand !== "MenuItem") {
      fail();
    }

    item._click();
    expect(mockCallback.mock.calls).toHaveLength(1);
  });
});

declare global {
  namespace NodeJS {
    interface Global {
      menuFunction: () => void;
    }
  }
}
