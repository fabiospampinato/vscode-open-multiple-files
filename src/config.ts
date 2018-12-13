
/* IMPORT */

import * as vscode from 'vscode';

interface IMultipleLinesConfig {
  limit: number;
}
/* CONFIG */

const Config = {

  get ( extension = 'openMultipleFiles' ): IMultipleLinesConfig {

    return vscode.workspace.getConfiguration ().get ( extension );

  }

};

/* EXPORT */

export default Config;
