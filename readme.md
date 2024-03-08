# Open Multiple Files

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-open-multiple-files/master/resources/logo.png" width="128" alt="Logo">
</p>

Open all files in a folder at once, optionally filtering by a glob.

You can read more about the supported glob syntax [here](https://github.com/fabiospampinato/zeptomatch).

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-open-multiple-files), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-open-multiple-files
```

## Usage

It adds 1 command to the command palette:

```js
'Open Multiple Files' // Open all files at once, optionally filtering by a glob
```

You can also right click a folder in the explorer and only search in that folder.

## Settings

```js
{
  "openMultipleFiles.exclude": null, // An array of globs to exclude, unless specificed it uses the "files.exclude" setting
  "openMultipleFiles.ignore": [".gitignore"], // An array of names for .gitignore-like files to use
  "openMultipleFiles.limit": 100 // Max number of files to open
}
```

## License

MIT © Fabio Spampinato
