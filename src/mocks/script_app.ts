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
  namespace NodeJS {
    interface Global {
      ScriptApp: ScriptApp;
    }
  }
}

global.ScriptApp = ScriptApp;
