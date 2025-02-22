# THIS FORK IS NOT READY FOR PRODUCTION USE
This is a WIP fork of the somewhat abandoned https://github.com/h2qutc/angular-material-components project.
Please refrain from using this fork in production environments until further notice.
Also expect frequent and unannounced breaking changes to the code-base in case you want to try your luck.

# When will this be ready?
Quite frankly, I don't know, but once it is, I will ask GitHub Support to detach the project from its parent repo,
because I doubt the original author will have the time to review the already literal hundreds of file changes.

# Found an issue with this fork?
Please open an issue on this repo (not the original), and I will address it as soon as possible.

# Getting Started (Contributors)

## Requirements
- node >= v20.12.0
- yarn >= 1.22.22
- Make sure your editor utilizes prettier and eslint - beautify your code before committing <3

## Steps to run the project

1. Clone the repo
2. Run `yarn install` or just `yarn`
3. Run `yarn start` to start the development server

## Useful resources
- [Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0/)
- [Angular Material](https://material.angular.io/)
- [Angular Material Component Theming Guide](https://material.angular.io/guide/theming-your-components)
- [Angular Material CDK](https://material.angular.io/cdk/overlay/overview)


# Angular Material Extra Components (DatetimePicker, TimePicker, ColorPicker, FileInput ...) for @angular/material 7.x, 8.x, 9.x, 10.x, 11.x, 12.x, 13.x, 14.x, 15.x, 16.x

[![Build Status](https://travis-ci.com/h2qutc/angular-material-components.svg?branch=master)](https://travis-ci.com/h2qutc/angular-material-components)
[![License](https://img.shields.io/npm/l/angular-material-components.svg)](https://www.npmjs.com/package/angular-material-components)

## Description

Angular Material Library provide extra components for every project (Datetime picker, Time picker, Color picker...).

## DEMO Angular Material Components

@see [LIVE DEMO AND DOCUMENTATION](https://h2qutc.github.io/angular-material-components/)

Choose the version corresponding to your Angular version:

 Angular     | @angular-material-components/datetime-picker
 ----------- | -------------------
 16          | 16.x+
 15          | 15.x+ OR 9.x+ for legacy import
 14          | 8.x+
 13          | 7.x+
 12          | 6.x+
 11          | 5.x+
 10          | 4.x+
 9           | 2.x+
 8           | 2.x+
 7           | 2.x+


### Datetime Picker

[![npm version](https://badge.fury.io/js/%40angular-material-components%2Fdatetime-picker.svg)](https://www.npmjs.com/package/@angular-material-components/datetime-picker)
[![Github All Releases](https://img.shields.io/npm/dt/@angular-material-components/datetime-picker.svg)]()

[TUTORIAL HERE](https://h2qutc.github.io/angular-material-components/)

```
npm install --save  @angular-material-components/datetime-picker
```

![Alt Text](demo_datetime_picker.png)

@see [DEMO stackblitz for Angular 7, Angular 8](https://stackblitz.com/edit/demo-ngx-mat-datetime-picker)

@see [DEMO stackblitz for Angular 9](https://stackblitz.com/edit/demo-ngx-mat-datetime-picker-angular9)

### Color Picker

[![npm version](https://badge.fury.io/js/%40angular-material-components%2Fcolor-picker.svg)](https://www.npmjs.com/package/@angular-material-components/color-picker)
[![Github All Releases](https://img.shields.io/npm/dt/@angular-material-components/color-picker.svg)]()

[TUTORIAL HERE](https://h2qutc.github.io/angular-material-components/)

```
npm install --save  @angular-material-components/color-picker
```

![Alt Text](demo_color_picker.png)
@see [DEMO stackblitz](https://stackblitz.com/edit/demo-ngx-mat-color-picker)

### File Input

[![npm version](https://badge.fury.io/js/%40angular-material-components%2Ffile-input.svg)](https://www.npmjs.com/package/@angular-material-components/file-input)
[![Github All Releases](https://img.shields.io/npm/dt/@angular-material-components/file-input.svg)]()

[TUTORIAL HERE](https://h2qutc.github.io/angular-material-components/)

```
npm install --save  @angular-material-components/file-input
```

![Alt Text](demo_file_input.png)


### Theming
- @see @angular/material [Using a pre-built theme](https://material.angular.io/guide/theming#using-a-pre-built-theme)
- Add the Material Design icon font to your index.html
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet">
```

## License
MIT
