
/* IMPORT */

import * as _ from 'lodash';
import * as absolute from 'absolute';
import * as fs from 'fs';
import * as path from 'path';
import * as pify from 'pify';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands}: { commands: vscode.Command[] } = vscode.extensions.getExtension ( 'fabiospampinato.vscode-open-multiple-files' ).packageJSON.contributes;

    commands.forEach ( ({command, title}) => {

      const commandName: string = _.last ( command.split ( '.' ) ),
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, handler );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  file: {

    open ( filePath: string, isTextDocument = true ) {

      filePath = path.normalize ( filePath );

      const fileuri = vscode.Uri.file ( filePath );

      if ( isTextDocument ) {

        return vscode.workspace.openTextDocument ( fileuri )
                               .then ( doc => vscode.window.showTextDocument ( doc, { preview: false } ) );

      } else {

        return vscode.commands.executeCommand ( 'vscode.open', fileuri );

      }

    }

  },

  folder: {

    async is ( folderpath: string ): Promise<boolean> {

      const stats = await pify ( fs.lstat )( folderpath );

      return stats.isDirectory ();

    },

    getRootPath ( basePath?: string ): string {

      const {workspaceFolders} = vscode.workspace;

      if ( !workspaceFolders ) return;

      const firstRootPath: string = workspaceFolders[0].uri.fsPath;

      if ( !basePath || !absolute ( basePath ) ) return firstRootPath;

      const rootPaths: string[] = workspaceFolders.map ( folder => folder.uri.fsPath ),
            sortedRootPaths: string[] = _.sortBy ( rootPaths, [path => path.length] ).reverse (); // In order to get the closest root

      return sortedRootPaths.find ( (rootPath: string) => basePath.startsWith ( rootPath ) );

    },

  }

};

/* EXPORT */

export default Utils;
