
/* TYPES */

interface IConfig {
  exclude: string,
  limit: number;
}

interface IContextMenuObj {
  fsPath: string;
  external: string;
  path: string;
  scheme: string;
}

/* EXPORT */

export {IConfig, IContextMenuObj};
