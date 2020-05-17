import { Properties } from "./properties";

describe("Properties", () => {
  it("gets and sets", () => {
    const properties = new Properties();

    properties.setProperty("foo", "bar");
    expect(properties.getProperty("foo")).toEqual("bar");
  });

  it("overrides previously set keys", () => {
    const properties = new Properties();

    properties.setProperty("foo", "bar");
    properties.setProperty("foo", "baz");
    expect(properties.getProperty("foo")).toEqual("baz");
  });

  test("different properties don't conflict", () => {
    const first = new Properties();
    const second = new Properties();

    first.setProperty("foo", "bar");
    second.setProperty("foo", "baz");

    expect(first.getProperty("foo")).toEqual("bar");
    expect(second.getProperty("foo")).toEqual("baz");
  });

  it("deletes all properties", () => {
    const properties = new Properties();

    properties.setProperty("foo", "bar");
    properties.deleteAllProperties();
    expect(properties.getProperty("foo")).toBeNull();
  });
});

describe("PropertiesService", () => {
  describe("DocumentProperties", () => {
    beforeEach(() => {
      const properties = PropertiesService.getDocumentProperties();
      properties.deleteAllProperties();
    });

    it("gets and sets", () => {
      const properties = PropertiesService.getDocumentProperties();

      properties.setProperty("foo", "bar");
      expect(properties.getProperty("foo")).toEqual("bar");
    });

    test("two instances view the same changes", () => {
      const first = PropertiesService.getDocumentProperties();
      const second = PropertiesService.getDocumentProperties();

      first.setProperty("foo", "bar");
      expect(second.getProperty("foo")).toEqual("bar");
    });
  });
});
