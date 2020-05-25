import { Ui } from "./ui";

/** Mocks a Google AppsScript DocumentApp object.
 * https://developers.google.com/apps-script/reference/document/document-app
 */
export class DocumentApp {
  static ui = new Ui();
  public static getUi(): Ui {
    return this.ui;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      DocumentApp: DocumentApp;
    }
  }
}

global.DocumentApp = DocumentApp;
