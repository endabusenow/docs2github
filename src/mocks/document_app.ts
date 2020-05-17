import { Ui } from "./ui";

/** Mocks a Google AppsScript DocumentApp object.
 * https://developers.google.com/apps-script/reference/document/document-app
 */
export class DocumentApp {
  static ui = new Ui();
  public static getUi() {
    return this.ui;
  }
}
