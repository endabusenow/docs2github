import { updateMenu } from "./src/menu";

// @ts-ignore: Specially named function for Google AppsScript.
function onOpen(e: GoogleAppsScript.Events.DocsOnOpen) {
  updateMenu(e.authMode);
}
