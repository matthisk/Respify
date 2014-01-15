Respify
=======

Respify responsive image library

A simple responsive images library, which parses a image from a set of child span nodes with data-media and data-src attributes. It uses media queries to select images.

## Example
====

This is an example of how to use Respify

Respify can either be used on an image tag, or any other tag but then the background option should be set to ```true```. Respify wil pop from the array of span child nodes, this means that the last node in the list will be parsed first. If Respify finds one matching media query it will use the corresponding image and stop the search.

```
<span id="responsive]">
	 <span data-src="small.jpg"></span>
     <span data-media="(min-width: 768px)" data-src="medium.jpg"></span>
     <span data-media="(min-width: 1072px" data-src="large.jpg"></span>
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
====

### background

type: boolean, default: ```false```

wether to place the selected image as a background-image css property or as a img src attribute.

### dryRun

type: boolean, default: ```false```

If set to true the plugin will only return the set of matched images and not actually place them on the tags. This can be usefull if you want to supply the selected image to some other piece of code which can not implicitly handle responsive images.
