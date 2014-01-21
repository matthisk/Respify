Respify
=======

Respify responsive image library

A simple responsive images library, which parses a image from a set of child span nodes with data-media and data-src attributes. It uses media queries to select images.

## Example

This is an example of how to use Respify

Respify can either be used on an image tag, or any other tag but then the background option should be set to ```true```. Respify wil pop from the array of span child nodes, this means that the last node in the list will be parsed first. If Respify finds one matching media query it will use the corresponding image and stop the search.

```
<span id="default-responsive" class="responsive-img" data-alt="This is an example of a responsive image">
	<span data-src="img/yacht_race@mobile.jpg" data-media="(max-width: 30em)"></span>
	<span data-src="img/yacht_race@wide-mobile.jpg" data-media="(min-width: 30em) and (max-width: 48em)"></span>
	<span data-src="img/yacht_race@tablet.jpg" data-media="(min-width: 48em) and (max-width: 60em)"></span>
	<span data-src="img/yacht_race@desktop.jpg" data-media="(min-width: 60em) and (max-width: 80em)"></span>
	<span data-src="img/yacht_race@hires.jpg" data-media="(min-width: 80em)"></span>

	<noscript><img src="ext/img/yacht_race@hires.jpg" alt="A yacht race"></noscript>
</span>
```

Set up the Javascript like this:

```
$('#responsive').respify();
```

Respify is a spin off from the picture tag specification, the major difference is that it can set background image of the parent tag. Using child ```span``` tags you can supply different size images. Set the data-media tag to specify a media query and use the data-src tag to specify a src image.

Pass options to respify as an object:

```
$('img').respify({
	background : true
});
```
Respify adds an event listener to the resize event and will recalculate the image it has to use.


## Options

### background

type: boolean, default: ```false```

wether to place the selected image as a background-image css property or as a img src attribute.

### dryRun

type: boolean, default: ```false```

If set to true the plugin will only return the set of matched images and not actually place them on the tags. This can be usefull if you want to supply the selected image to some other piece of code which can not implicitly handle responsive images.

### callback

type: Function, default: ```undefined```

Here you can supply a function to Respify, this function will be called whenever a new image is calculted at resize. This is especially usefull in combination with the dryRun setting where the image is not actually set on the picture tag. 