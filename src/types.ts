
interface IConfig {
  limit: number;
}

interface IContextMenuPath {
  fsPath: string;
  external: string;
  path: string;
  scheme: string;
}

/* EXPORT */

export {IConfig, IContextMenuPath};
