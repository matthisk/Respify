Respify
=======

Respify responsive image library

A simple responsive images library, which parses a image from a set of data attributes trough media queries. It depends upon the matchMedia polyfill for older browsers.


## Options

### background

type: boolean, default: false

wether to place the selected image as a background-image css property or as a img src attribute.

### dryRun

type: boolean, default: false

If set to true the plugin will only return the set of matched images and not actually place them on the tags

### selectorPattern

type: regex, default: /^data\-respify\-(small|medium|large)$/

The regular expression to use for matching data attributes. All data attributes matching this regex will be parsed for image data.

### dataPattern

type: regex, default: /^\{(.*)\},\{(.*)\}$/

The pattern for matching media query and image src from the data attributes value.

### dataMediaQuery

type: integer, default: 1

The spot on which the dataPattern regex matches the mediaQuery

### dataSrc

type: integer, default: 2

The spot on which the dataPattern regex matches the image src

