import { Ui } from "./ui";

describe("Ui", () => {
  describe("menu", () => {
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

  describe("prompt", () => {
    test("prompt(prompt) returns correct response", () => {
      const ui = new Ui();
      ui._setNextPromptResponseResponseText("foo");
      ui._setNextPromptResponseSelectedButton(Ui.Button.OK);

      const prompt = ui.prompt("Question?");
      expect(prompt.getResponseText()).toBe("foo");
      expect(prompt.getSelectedButton()).toBe(Ui.Button.OK);
    });

    test("prompt(prompt, buttons) returns correct response", () => {
      const ui = new Ui();
      ui._setNextPromptResponseResponseText("foo");
      ui._setNextPromptResponseSelectedButton(Ui.Button.YES);

      const prompt = ui.prompt("Question?", Ui.ButtonSet.YES_NO);
      expect(prompt.getResponseText()).toBe("foo");
      expect(prompt.getSelectedButton()).toBe(Ui.Button.YES);
    });

    test("prompt(title, prompt, buttons) returns correct response", () => {
      const ui = new Ui();
      ui._setNextPromptResponseResponseText("foo");
      ui._setNextPromptResponseSelectedButton(Ui.Button.YES);

      const prompt = ui.prompt("Title", "Question?", Ui.ButtonSet.YES_NO);
      expect(prompt.getResponseText()).toBe("foo");
      expect(prompt.getSelectedButton()).toBe(Ui.Button.YES);
    });

    test("prompt(prompt, buttons) throws if button is not in ButtonSet", () => {
      const ui = new Ui();
      ui._setNextPromptResponseResponseText("foo");
      ui._setNextPromptResponseSelectedButton(Ui.Button.OK);

      expect(() => ui.prompt("Question?", Ui.ButtonSet.YES_NO)).toThrowError(
        "not in ButtonSet"
      );
    });

    test("prompt(title, prompt, buttons) throws if button is not in ButtonSet", () => {
      const ui = new Ui();
      ui._setNextPromptResponseResponseText("foo");
      ui._setNextPromptResponseSelectedButton(Ui.Button.OK);

      expect(() =>
        ui.prompt("Title", "Question?", Ui.ButtonSet.YES_NO)
      ).toThrowError("not in ButtonSet");
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
