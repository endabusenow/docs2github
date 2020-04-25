import { Repository, getRepositories } from "./repositories";

// We have to hardcode a max repository limit because Google Apps Script only
// allows us to register global functions on script load. 100 repositories for
// a document should be more than sufficient.
const NUM_MAX_REPOSITORIES = 100;

/**
 * Creates or updates the Google Docs Add-ons menu.
 * @param authMode - The script's authorization level.
 */
export function updateMenu(authMode: GoogleAppsScript.Script.AuthMode) {
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

      const exporterName = `exportToGitHub_${i}`;
      const unlinkerName = `removeRepository_${i}`;

      submenu.addItem("Export to GitHub", `${exporterName}`);
      submenu.addItem("Unlink", `${unlinkerName}`);

      menu.addSubMenu(submenu);
    }
  }
  menu.addToUi();
}

// @ts-ignore: tsc thinks this function is never read, but it's referred to by
// the string name instead.
function linkRepositoryCallback() {
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

function setupRepositoryCallbacks(scope: any) {
  for (let i = 0; i < NUM_MAX_REPOSITORIES; ++i) {
    scope[`exportToGitHub_${i}`] = createExporterCallback(i);
    scope[`removeRepository_${i}`] = createUnlinkerCallback(i);
  }
}

// @ts-ignore: No declaration for this type, so it triggers "noImplicitAny"
setupRepositoryCallbacks(this);
