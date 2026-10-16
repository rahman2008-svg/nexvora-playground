export interface FiddleState {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  javascript: string;
  externalResources: ExternalResource[];
  htmlSettings: {
    preprocessor: 'html' | 'markdown';
  };
  cssSettings: {
    preprocessor: 'css' | 'scss';
    normalize: boolean;
  };
  jsSettings: {
    framework: 'vanilla' | 'babel' | 'typescript';
    loadType: 'onLoad' | 'onDOMContentLoaded' | 'head' | 'body';
  };
  updatedAt: number;
}

export interface ExternalResource {
  id: string;
  name: string;
  url: string;
  type: 'js' | 'css';
  enabled: boolean;
}

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error';
  content: string;
  timestamp: string;
  count?: number;
}

export type LayoutMode = 'classic' | 'columns' | 'rows' | 'tabs';

export interface EditorSettings {
  tabSize: 2 | 4;
  lineNumbers: boolean;
  autoRun: boolean;
  autoRunDelay: number;
  clearConsoleOnRun: boolean;
  wordWrap: boolean;
  theme: 'dark' | 'light';
  fontSize: number;
}

export interface BoilerplateTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  badge?: string;
  html: string;
  css: string;
  javascript: string;
  externalResources: ExternalResource[];
  jsSettings?: {
    framework: 'vanilla' | 'babel' | 'typescript';
    loadType: 'onLoad' | 'onDOMContentLoaded' | 'head' | 'body';
  };
}
