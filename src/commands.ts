
/* IMPORT */

import * as _ from 'lodash';
import * as isBinaryCallback from 'isbinaryfile';
import * as path from 'path';
import * as pify from 'pify';
import * as vscode from 'vscode';
import Config from './config';
import {IContextMenuObj} from './types';
import Utils from './utils';

/* COMMANDS */

async function open ( contextMenuObj?: IContextMenuObj | string ) {

  let basePath: string = '';

  if ( contextMenuObj && !_.isString ( contextMenuObj ) ) {

    basePath = contextMenuObj.fsPath;

  }

  if ( basePath && !await Utils.folder.is ( basePath ) ) return vscode.window.showErrorMessage ( 'The target must be a directory, not a file' );

  const config = Config.get ();

  let includeGlob: string | undefined = _.isString ( contextMenuObj ) ? contextMenuObj : undefined;

  if ( !includeGlob ) {

    includeGlob = await vscode.window.showInputBox ({
      placeHolder: 'Glob: *.{js,ts}',
      value: '**/*'
    });

  }

  if ( !includeGlob ) return;

  let rootPath: string;

  if ( basePath ) {

    rootPath = Utils.folder.getRootPath ( basePath );

    if ( !rootPath ) return vscode.window.showErrorMessage ( 'Root path not found' );

    if ( basePath !== rootPath ) {

      const relPath: string = basePath.substring ( rootPath.length + 1 );

      includeGlob = path.join ( relPath, includeGlob ).replace ( /\\/g, '/' );

    }

  }

  const excludeGlob = config.exclude;

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
