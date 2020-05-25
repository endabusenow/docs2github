enum AuthMode {
  NONE,
  CUSTOM_FUNCTION,
  LIMITED,
  FULL,
}

export class ScriptApp {
  static readonly AuthMode = AuthMode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ScriptApp: ScriptApp;
    }
  }
}

global.ScriptApp = ScriptApp;
