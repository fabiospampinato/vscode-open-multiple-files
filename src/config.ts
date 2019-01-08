
/* IMPORT */

import * as vscode from 'vscode';
import {IConfig} from './types';

/* CONFIG */

const Config = {

  get ( extension = 'openMultipleFiles' ): IConfig {

    return vscode.workspace.getConfiguration ().get ( extension );

  }

};

/* EXPORT */

export default Config;
