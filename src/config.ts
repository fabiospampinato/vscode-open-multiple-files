
/* IMPORT */

import * as vscode from 'vscode';
import { IMultipleLinesConfig } from './types';


/* CONFIG */

const Config = {

  get ( extension = 'openMultipleFiles' ): IMultipleLinesConfig {

    return vscode.workspace.getConfiguration ().get ( extension );

  }

};

/* EXPORT */

export default Config;
