
/* IMPORT */

import * as _ from 'lodash';
import * as isBinaryCallback from 'isbinaryfile';
import * as path from 'path';
import * as pify from 'pify';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';
import {IContextMenuPath} from './types';


/* COMMANDS */

async function open ( passedBasePath?: IContextMenuPath ) {
  let basePath: string = '';

  if (passedBasePath && !_.isString( passedBasePath )) {
    basePath = passedBasePath.fsPath;
  }

  if ( basePath && !await Utils.folder.is ( basePath ) ) return vscode.window.showErrorMessage ( 'The target must be a directory, not a file' );

  const config = Config.get ();

  let includeGlob: string | undefined = await vscode.window.showInputBox ({
    placeHolder: 'Glob: *.{js,ts}',
    value: '**/*'
  });

  if ( !includeGlob ) return;

  let rootPath: string;

  if ( basePath ) {

    rootPath = Utils.folder.getRootPath ( basePath );

    if ( !rootPath ) return vscode.window.showErrorMessage ( 'Root path not found' );

    if ( basePath !== rootPath ) {

      const relPath: string = basePath.substring ( rootPath.length + 1 );

      includeGlob = path.join ( relPath, includeGlob );

    }

  }

  const excludeGlob: vscode.GlobPattern = ( vscode.workspace.getConfiguration ().get ( 'files' ) as any).exclude;

  const findFiles = await vscode.workspace.findFiles ( includeGlob, excludeGlob, config.limit ),
        rootFiles = findFiles.filter ( file => !rootPath || file.fsPath.startsWith ( rootPath ) );

  if ( !rootFiles.length ) return vscode.window.showInformationMessage ( `No files found with the glob: ${includeGlob}` );

  const isBinary = pify ( isBinaryCallback );

  const filesPaths: string[] = rootFiles.map ( file => file.fsPath ),
        filesPathsSorted: string[] = _.sortBy ( filesPaths, [x => x.split ( path.sep ).length, _.identity] ),
        filesBinaryFlags = await Promise.all ( filesPathsSorted.map ( filePath => isBinary ( filePath ).catch ( () => false ) ) ) as any;

  filesPathsSorted.forEach ( ( filePath, index ) => Utils.file.open ( filePath, !filesBinaryFlags[index] ) );

}

/* EXPORT */

export {open};
