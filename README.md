[Bootstrap - Lightbox](http://jbutz.github.com/bootstrap-lightbox/) [![Build Status](https://secure.travis-ci.org/jbutz/bootstrap-lightbox.png)](http://travis-ci.org/jbutz/bootstrap-lightbox)
=================

This is a plugin for Twitter Bootstrap that adds a lightbox that is based off the modal dialog


Quick start
-----------

You have several options. You can clone the repository `git clone git://github.com/jbutz/bootstrap-lightbox.git`, grab an [archive](https://github.com/jbutz/bootstrap-lightbox/tags), or use [cdnjs](http://cdnjs.com/#bootstrap-lightbox).

Once you have the files include the CSS and JavaScript files in your page and then give the example code below a shot.

Example
-----------

```html
<a data-toggle="lightbox" href="#demoLightbox">Open Lightbox</a>
<div id="demoLightbox" class="lightbox fade"  tabindex="-1" role="dialog" aria-hidden="true">
	<div class='lightbox-dialog'>
		<div class='lightbox-content'>
			<img src="image.png">
			<div class='lightbox-caption'>
				Your caption here
			</div>
		</div>
	</div>
</div>
```

Usage
-----------

### Via data attributes ###

All you need to do is add `data-toggle="lightbox"` and `href="#lightbox"` or `data-target="#lightbox"` to a link, and set the `href` so it references the lightbox you want to display.
```html
<a data-toggle="lightbox" href="#demoLightbox">Open Lightbox</a>
```

### Via JavaScript ###

Open the lightbox with the id `myLightbox`.
```javascript
$('#myLightbox').lightbox(options)
```

### Options ###

<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>backdrop</td>
			<td>boolean</td>
			<td>true</td>
			<td>This adds a modal-backdrop element.</td>
		</tr>
		<tr>
			<td>keyboard</td>
			<td>boolean</td>
			<td>true</td>
			<td>Pressing escape closes the lightbox.</td>
		</tr>
		<tr>
			<td>show</td>
			<td>boolean</td>
			<td>true</td>
			<td>Shows the lightbox when initialized.<br><i>Note: This only applies when using JavaScript to setup the lightbox.</i></td>
		</tr>
		<tr>
			<td>resizeToFit</td>
			<td>boolean</td>
			<td>true</td>
			<td>This resizes the image to fit the window if the image is too large.</td>
		</tr>
	</tbody>
</table>