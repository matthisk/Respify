Respify
=======

Respify responsive image library

A simple responsive images library, which parses a image from a set of data attributes trough media queries. It depends upon the matchMedia polyfill for older browsers.

## Example
====

This is an example of how to use Respify

Respify can either be used on an image tag, or any other tag but then the background option should be set to ```true```. You set all the types of images to use on data attributes. Respify parses greedy so once a media query matches it will use the corresponding src and will not continue parsing.


```
<img src="" alt="alternate text"
	 data-respify-large="{(min-width: 1072px)},{large.jpg}"
     data-respify-medium="{(min-width: 7068px)},{medium.jpg}"
	 data-respify-small="{},{small.jpg}" />
```

Set up the Javascript like this:

```
$('img').respify();
```

Using the options object supplied to Respify you can change the match pattern for the data attribute. For example setting dataPattern to: ```/^media=\{(.*)\},src=\{(.*)\}$/``` will require to set some extra symantics on the data attribute: ```data-respify-large="media={(min-width: 1072px),src={large.jpg}"```

Pass options to respify as an object:

```
$('img').respify({
	dataPattern : /^media=\{(.*)\},src=\{(.*)\}$/
});
```

## Options
====

### background

type: boolean, default: ```false```

wether to place the selected image as a background-image css property or as a img src attribute.

### dryRun

type: boolean, default: ```false```

If set to true the plugin will only return the set of matched images and not actually place them on the tags

### selectorPattern

type: regex, default: ```/^data\-respify\-(small|medium|large)$/```

The regular expression to use for matching data attributes. All data attributes matching this regex will be parsed for image data.

### dataPattern

type: regex, default: ```/^\{(.*)\},\{(.*)\}$/```

The pattern for matching media query and image src from the data attributes value.

### dataMediaQuery

type: integer, default: ```1```

The spot on which the dataPattern regex matches the mediaQuery

### dataSrc

type: integer, default: ```2```

The spot on which the dataPattern regex matches the image src

