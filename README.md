[Bootstrap - Lightbox](http://jbutz.github.com/bootstrap-lightbox/) [![Build Status](https://secure.travis-ci.org/jbutz/bootstrap-lightbox.png)](http://travis-ci.org/jbutz/bootstrap-lightbox)
=================

This is a plugin for Twitter Bootstrap that adds a lightbox that is based off the modal dialog


Quick start
-----------

You have several options. You can clone the repository `git clone git://github.com/jbutz/bootstrap-lightbox.git`, grab an [archive](https://github.com/jbutz/bootstrap-lightbox/downloads), or use [cdnjs](http://cdnjs.com/#bootstrap-lightbox).

Once you have the files include the CSS and JavaScript files in your page and then give the example code below a shot.

Example
-----------

```html
<a data-toggle="lightbox" href="#demoLightbox">Open Lightbox</a>
<div id="demoLightbox" class="lightbox hide fade"  tabindex="-1" role="dialog" aria-hidden="true">
	<div class='lightbox-header'>
		<button type="button" class="close" data-dismiss="lightbox" aria-hidden="true">&times;</button>
	</div>
	<div class='lightbox-content'>
		<img src="image.png">
	</div>
</div>
```