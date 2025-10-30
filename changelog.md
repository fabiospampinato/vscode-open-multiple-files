### Version 2.0.4
- Ensuring .gitignore-like files found between the root and the actual search roots are not considered, so that ignored folders can be still directly searched into

### Version 2.0.3
- Ensuring ".gitignore" is used as the default value for the "ignore" setting
- Optimized handling of .gitignore-like files, finding files faster

### Version 2.0.2
- Simplified icon

### Version 2.0.1
- Minor internal improvements
- Ensuring files are opened in permanent tabs

### Version 2.0.0
- Rewritten: more modern code, no third-party dependencies, 99% smaller bundle
- New setting: "openMultipleFiles.ignore", for specifying .gitignore-like files to use
- Asking for confirmation when more than than "openMultipleFiles.limit" files have been found

### Version 1.4.0
- Added a "openMultipleFiles.exclude" setting

### Version 1.3.0
- Added support for accepting a string argument to the “openMultipleFiles.open” command

### Version 1.2.5
- Fixed globs normalization under Windows

### Version 1.2.4
- Readme: using hi-res logo

### Version 1.2.3
- Outputting modern code (es2017, faster)
- Using "Debug Launcher" for debugging

### Version 1.2.2
- Bundling with webpack

### Version 1.2.1
- Always opening files as non-previews

### Version 1.2.0
- Added support for binary files

### Version 1.1.1
- Added support for exiting the quickpick
- Fixed placeholder glob
- Readme: added a link to the supported glob syntax

### Version 1.1.0
- Sorting the files before opening them

### Version 1.0.3
- Ensuring it works in workspaces with multiple roots having similar structures

### Version 1.0.2
- Updated readme

### Version 1.0.1
- Showing the menu item only when right-clicking a folder

### Version 1.0.0
- Initial release
