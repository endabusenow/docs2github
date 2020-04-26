import "./mocks/properties";
import { getRepositories, setRepositories } from "./repositories";

describe("repositories", () => {
  test("setRepositories then getRepositories", () => {
    const repositories = [
      {
        name: "First repository",
        url: "https://example.com/first_repository",
        path: "src/posts/first_post",
      },
      {
        name: "Second repository",
        url: "https://example.com/second_repository",
        path: "src/posts/first_post",
      },
    ];

    setRepositories(repositories);
    expect(getRepositories()).toEqual(repositories);
  });
});
