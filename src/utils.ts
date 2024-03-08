
/* IMPORT */

import fastIgnore from 'fast-ignore';
import fs from 'node:fs';
import path from 'node:path';
import readdir from 'tiny-readdir-glob';
import vscode from 'vscode';

/* MAIN */

//TODO: Maybe promote the "ignore function generation" stuff to a standalone package, as it could be broadly useful

const getFilesByGlobs = async ( rootPath: string, includeGlob: string | string[], excludeGlob?: string | string[] ): Promise<string[]> => {

  const {files} = await readdir ( includeGlob, {
    cwd: rootPath,
    ignore: excludeGlob,
    followSymlinks: false
  });

  return files;

};

const getFilesByNames = async ( rootPath: string, fileNames: string[] ): Promise<string[]> => {

  if ( !fileNames.length ) return [];

  const {files} = await readdir ( `**/${fileNames}`, {
    cwd: rootPath,
    followSymlinks: false
  });

  return files;

};

const getFilesExclude = (): string[] => {

  const excludes = vscode.workspace.getConfiguration ().get ( 'files.exclude' );

  if ( !isObject ( excludes ) ) return [];

  const globs = Object.entries ( excludes ).filter ( ([ _, enabled ]) => enabled ).map ( ([ glob ]) => glob );

  return globs;

};

const getIgnoreFromFilePath = ( filePath: string ): (( filePath: string ) => boolean) => {

  const fileContent = fs.readFileSync ( filePath, 'utf8' );
  const folderPath = path.dirname ( filePath );
  const ignore = fastIgnore ( fileContent );

  return ( filePath: string ): boolean => {

    return ignore ( path.relative ( folderPath, filePath ) );

  };

};

const getIgnoreFromFilePaths = ( filePaths: string[] ): (( filePath: string ) => boolean) => {

  const ignores = filePaths.map ( getIgnoreFromFilePath );

  if ( !ignores.length ) return () => false;

  return ( filePath: string ): boolean => {

    return ignores.some ( ignore => ignore ( filePath ) );

  };

};

const isArray = ( value: unknown ): value is any[] => {

  return Array.isArray ( value );

};

const isFolder = ( folderPath: string ): boolean => {

  try {

    return fs.statSync ( folderPath ).isDirectory ();

  } catch {

    return false;

  }

};

const isNumber = ( value: unknown ): value is number => {

  return typeof value === 'number';

};

const isObject = ( value: unknown ): value is Record<string, unknown> => {

  return typeof value === 'object' && value !== null;

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const openFile = ( filePath: string ): void => { //TODO: Maybe move this to "vscode-extras"

  const uri = vscode.Uri.file ( filePath );

  vscode.commands.executeCommand ( 'vscode.open', uri );

};

/* EXPORT */

export {getFilesByGlobs, getFilesByNames, getFilesExclude, getIgnoreFromFilePath, getIgnoreFromFilePaths, isArray, isFolder, isNumber, isObject, isString, openFile};
