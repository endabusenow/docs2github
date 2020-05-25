import { updateMenu } from "./src/menu";

function onOpen(e: GoogleAppsScript.Events.DocsOnOpen) {
  updateMenu(e.authMode);
}

onOpen; // Disables TypeScript unused function warning.
