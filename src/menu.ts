import { Repository, getRepositories } from "./repositories";

// We have to hardcode a max repository limit because Google Apps Script only
// allows us to register global functions on script load. 100 repositories for
// a document should be more than sufficient.
const NUM_MAX_REPOSITORIES = 100;

function exportToGitHubTemplate(i: number) {
  return `exportToGitHub_${i}`;
}

function unlinkRepositoryTemplate(i: number) {
  return `unlinkRepository_${i}`;
}

/**
 * Creates or updates the Google Docs Add-ons menu.
 * @param authMode - The script's authorization level.
 */
export function updateMenu(authMode: GoogleAppsScript.Script.AuthMode): void {
  const ui = DocumentApp.getUi();
  const menu = ui.createAddonMenu();
  menu.addItem("Link repository", "linkRepositoryCallback");
  menu.addSeparator();

  if (authMode != ScriptApp.AuthMode.NONE) {
    const repos = getRepositories();
    // AppScript does not support entries().
    for (let i = 0; i < repos.length; ++i) {
      const repo: Repository = repos[i];
      const submenu = ui.createMenu(repo.name);

      submenu.addItem("Export to GitHub", exportToGitHubTemplate(i));
      submenu.addItem("Unlink", unlinkRepositoryTemplate(i));

      menu.addSubMenu(submenu);
    }
  }
  menu.addToUi();
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: tsc thinks this function is never read, but it's referred to by
// the string name instead.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function linkRepositoryCallback(): void {
  Logger.log("Linking repository ", name);
  updateMenu(ScriptApp.AuthMode.FULL);
}

function createExporterCallback(repo_index: number) {
  return function () {
    const repo = getRepositories()[repo_index];
    const { name } = repo;
    Logger.log("Running exporter for repository", name);
  };
}

function createUnlinkerCallback(repo_index: number) {
  return function () {
    const repo = getRepositories()[repo_index];
    const { name } = repo;
    Logger.log("Unlinking repository", name);
  };
}

// TODO(tylerhou): Migrate to non-global scope with V8 AppsScript engine.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setupRepositoryCallbacks(scope: any) {
  for (let i = 0; i < NUM_MAX_REPOSITORIES; ++i) {
    scope[exportToGitHubTemplate(i)] = createExporterCallback(i);
    scope[unlinkRepositoryTemplate(i)] = createUnlinkerCallback(i);
  }
}

let global;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No declaration for this type, so it triggers "noImplicitAny"
setupRepositoryCallbacks(this || global);
