const properties = new Map();

export class DocumentProperties {
  static setProperty(name: string, value: string): void {
    properties.set(name, value);
  }

  static getProperty(name: string): string | null {
    const value = properties.get(name);
    if (value === undefined) return null;
    return value;
  }
}

export class PropertiesService {
  static getDocumentProperties(): DocumentProperties {
    return DocumentProperties;
  }
}

global.PropertiesService = PropertiesService;
