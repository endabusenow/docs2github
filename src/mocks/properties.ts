/** Mocks a Google AppsScript Properties object.
 * https://developers.google.com/apps-script/reference/properties/properties
 */
export class Properties {
  propertiesStore: Map<string, string> = new Map();

  setProperty(name: string, value: string): void {
    this.propertiesStore.set(name, value);
  }

  getProperty(name: string): string | null {
    const value = this.propertiesStore.get(name);
    if (value === undefined) return null;
    return value;
  }

  deleteAllProperties(): void {
    this.propertiesStore.clear();
  }
}

export class PropertiesService {
  static documentProperties = new Properties();

  static getDocumentProperties(): Properties {
    return this.documentProperties;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      PropertiesService: typeof PropertiesService;
    }
  }
}

global.PropertiesService = PropertiesService;
