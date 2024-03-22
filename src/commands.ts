
/* IMPORT */

import path from 'node:path';
import vscode from 'vscode';
import {alert, getProjectRootPath, openInEditor, prompt} from 'vscode-extras';
import {getFiles, getOptions, isFolder, isString} from './utils';

/* MAIN */

const open = async ( target?: vscode.Uri | string ): Promise<void> => {

  const rootPath = ( target instanceof vscode.Uri ) ? target.fsPath : getProjectRootPath ();

  if ( !rootPath || !isFolder ( rootPath ) ) return alert.error ( 'Target directory not found' );

  const include = isString ( target ) ? target : await prompt.string ( 'Glob: **/*.{js,ts}', '**/*' );

  if ( !include ) return;

  const options = getOptions ();
  const filesTarget = await getFiles ( rootPath, include, options.exclude, options.ignore );

  if ( !filesTarget.length ) return alert.info ( `No files found with the glob: ${include}` );

  if ( filesTarget.length > options.limit && !await prompt.boolean ( `Found ${filesTarget.length} files, are you sure you want to open them all?` ) ) return;

  const filesTargetSorted = [...filesTarget].sort ().sort ( ( a, b ) => a.split ( path.sep ).length - b.split ( path.sep ).length );

  filesTargetSorted.forEach ( filePath => {

    openInEditor ( filePath, {
      preview: false
    });

  });

};

/* EXPORT */

export {open};
