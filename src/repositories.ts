const REPOSITORIES = "repositories";

export interface Repository {
  name: string;
  url: string;
  path: string;
}

/**
 * Gets the list of repositories that this document is linked to.
 * @returns A list of the linked repositories.
 */
export function getRepositories(): Repository[] {
  const properties = PropertiesService.getDocumentProperties();
  let unparsedRepos: string | null = properties.getProperty(REPOSITORIES);
  if (unparsedRepos === null) {
    unparsedRepos = "[]";
  }
  const repos = JSON.parse(unparsedRepos) as Repository[];
  if (!Array.isArray(repos)) return [];
  return repos;
}

/**
 * Sets the list of repositories that this document is linked to.
 * @param repos - The list of repositories to which to link this document.
 */
export function setRepositories(repos: Repository[]): void {
  const properties = PropertiesService.getDocumentProperties();
  properties.setProperty(REPOSITORIES, JSON.stringify(repos));
}
