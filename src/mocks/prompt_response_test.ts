import { Ui } from "./ui";
import { PromptResponse } from "./prompt_response";

describe("PromptResponse", () => {
  it("gets the response text", () => {
    const response = new PromptResponse("foo", Ui.Button.CLOSE);
    expect(response.getResponseText()).toBe("foo");
  });

  it("gets the selected button", () => {
    const response = new PromptResponse("foo", Ui.Button.OK);
    expect(response.getSelectedButton()).toBe(Ui.Button.OK);
  });
});
