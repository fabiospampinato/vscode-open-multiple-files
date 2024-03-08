
/* IMPORT */

import path from 'node:path';
import vscode from 'vscode';
import {getConfig, getProjectRootPath} from 'vscode-extras';
import {getFilesByGlobs, getFilesByNames, getFilesExclude, getIgnoreFromFilePaths, isFolder, isArray, isNumber, isString, openFile} from './utils';

/* MAIN */

const open = async ( target?: vscode.Uri | string ): Promise<void> => {

  const rootPath = ( target instanceof vscode.Uri ) ? target.fsPath : getProjectRootPath ();

  if ( !rootPath || !isFolder ( rootPath ) ) return void vscode.window.showErrorMessage ( 'Target directory not found' );

  const config = getConfig ( 'openMultipleFiles' );
  const exclude = isArray ( config?.exclude ) ? config.exclude : getFilesExclude ();
  const ignore = isArray ( config?.ignore ) ? config.ignore : [];
  const limit = isNumber ( config?.limit ) ? config.limit : 100;
  const include = isString ( target ) ? target : await vscode.window.showInputBox ({ placeHolder: 'Glob: **/*.{js,ts}', value: '**/*' });

  if ( !include ) return;

  const filesTarget = await getFilesByGlobs ( rootPath, include, exclude );
  const filesIgnore = await getFilesByNames ( rootPath, ignore );

  const isIgnored = getIgnoreFromFilePaths ( filesIgnore );
  const filesTargetIgnored = filesTarget.filter ( filePath => !isIgnored ( filePath ) );

  if ( !filesTargetIgnored.length ) return void vscode.window.showInformationMessage ( `No files found with the glob: ${include}` );

  if ( filesTargetIgnored.length > limit && ( await vscode.window.showInformationMessage ( `Found ${filesTargetIgnored.length} files, are you sure you want to open them all?`, 'Yes', 'No' ) ) !== 'Yes' ) return;

  const filesTargetSorted = [...filesTargetIgnored].sort ().sort ( ( a, b ) => a.split ( path.sep ).length - b.split ( path.sep ).length );

  filesTargetSorted.forEach ( openFile );

};

/* EXPORT */

export {open};
