
/* IMPORT */

import fs from 'node:fs';
import readdir from 'tiny-readdir-glob-gitignore';
import vscode from 'vscode';
import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

//TODO: Maybe promote the "ignore function generation" stuff to a standalone package, as it could be broadly useful

const getFiles = async ( rootPath: string, includeGlob: string | string[], excludeGlob: string | string[], ignoreNames: string[] ): Promise<string[]> => {

  const {files} = await readdir ( includeGlob, {
    cwd: rootPath,
    ignore: excludeGlob,
    ignoreFiles: ignoreNames,
    ignoreFilesFindAbove: false,
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

const getOptions = (): Options => {

  const config = getConfig ( 'openMultipleFiles' );
  const exclude = isArray ( config?.exclude ) && config.exclude.every ( isString ) ? config.exclude : getFilesExclude ();
  const ignore = isArray ( config?.ignore ) && config.ignore.every ( isString ) ? config.ignore : ['.gitignore'];
  const limit = isNumber ( config?.limit ) ? config.limit : 100;

  return { exclude, ignore, limit };

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

/* EXPORT */

export {getFiles, getFilesExclude, getOptions, isArray, isFolder, isNumber, isObject, isString};
