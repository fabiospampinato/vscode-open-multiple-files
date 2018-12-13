
/* IMPORT */

import * as vscode from 'vscode';

interface IConfig {
  limit: number;
}
/* CONFIG */

const Config = {

  get ( extension = 'openMultipleFiles' ): IConfig {

    return vscode.workspace.getConfiguration ().get ( extension );

  }

};

/* EXPORT */

export default Config;
