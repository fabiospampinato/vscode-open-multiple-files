# VSC Open Multiple Files

<p align="center">
	<img src="https://raw.githubusercontent.com/fabiospampinato/vscode-open-multiple-files/master/resources/logo-128x128.png" alt="Logo">
</p>

Open all files in a folder at once, optionally filtering by a glob.

## Install

Run the following in the command palette:

```shell
ext install vscode-open-multiple-files
```

## Usage

It adds 1 command to the command palette:

```js
Open Multiple Files // Open all files at once, optionally filtering by a glob
```

You can also right click a folder in the explorer and only search in that folder.

## Settings

```js
{
  "openMultipleFiles.limit": 100 // Max number of files to open
}
```

## Demo

![Demo](resources/demo.gif)

## License

MIT © Fabio Spampinato
