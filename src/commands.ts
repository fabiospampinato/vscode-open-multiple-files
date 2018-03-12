
/* IMPORT */

import * as _ from 'lodash';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function open ( basePath ) {

  basePath = basePath && !_.isString ( basePath ) ? basePath.fsPath : basePath;

  if ( basePath && !await Utils.folder.is ( basePath ) ) return vscode.window.showErrorMessage ( 'The target must be a directory, not a file' );

  const config = Config.get ();

  let includeGlob = await vscode.window.showInputBox ({
    placeHolder: 'Optional glob: *.{js|ts}',
    value: '**/*'
  });

  if ( basePath ) {

    const rootPath = Utils.folder.getRootPath ( basePath );

    if ( !rootPath ) return vscode.window.showErrorMessage ( 'Root path not found' );

    if ( basePath !== rootPath ) {

      const relPath = basePath.substring ( rootPath.length + 1 );

      includeGlob = path.join ( relPath, includeGlob );

    }

  }

  const excludeGlob = ( vscode.workspace.getConfiguration ().get ( 'files' ) as any ).exclude;

  const findFiles = await vscode.workspace.findFiles ( includeGlob, excludeGlob, config.limit );

  if ( !findFiles.length ) return vscode.window.showInformationMessage ( `No files found with the glob: ${includeGlob}` );

  findFiles.forEach ( file => Utils.file.open ( file.fsPath ) );

}

/* EXPORT */

export {open};
