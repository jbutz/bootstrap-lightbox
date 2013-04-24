/* =========================================================
 * bootstrap-lightbox.js
 * ========================================================= */


!function ($) {
	"use strict"; // jshint ;_;


/* LIGHTBOX CLASS DEFINITION
 * ========================= */

	var Lightbox = function (element, options)
	{
		this.options = options;
		this.$element = $(element)
			.delegate('[data-dismiss="lightbox"]', 'click.dismiss.lightbox', $.proxy(this.hide, this));

		this.options.remote && this.$element.find('.lightbox-body').load(this.options.remote);

	}

	// We depend upon Twitter Bootstrap's Modal library to simplify things here
	Lightbox.prototype = $.extend({},$.fn.modal.Constructor);

	Lightbox.prototype.constructor = Lightbox;

	// We can't use Modal for this, it depends upon a class
	Lightbox.prototype.enforceFocus = function ()
	{
		var that = this;
		$(document).on('focusin.lightbox', function (e)
		{
			if (that.$element[0] !== e.target && !that.$element.has(e.target).length)
			{
				that.$element.focus();
			}
		});
	};

	// We have to have a copy of this since we are tweaking it a bit
	Lightbox.prototype.show = function()
	{
		var that = this,
			e    = $.Event('show');
	
		this.$element.trigger(e)
	
		if (this.isShown || e.isDefaultPrevented()) return
	
		this.isShown = true;
	

		this.escape()
	
		// This bit is added since we don't display until we have the size
		//	which prevents image jumping
		this.preloadSize(function()
		{
			that.backdrop(function ()
			{
				var transition = $.support.transition && that.$element.hasClass('fade')
		
				if (!that.$element.parent().length)
				{
					that.$element.appendTo(document.body) //don't move modals dom position
				}
		
				that.$element.show()
		
				if (transition)
				{
					that.$element[0].offsetWidth // force reflow
				}
		
				that.$element
					.addClass('in')
					.attr('aria-hidden', false)
		
				that.enforceFocus()
		
				transition ?
					that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
					that.$element.focus().trigger('shown')
			});
		});
	};

	Lightbox.prototype.preloadSize = function(callback)
	{
		var callbacks = $.Callbacks();
		if(callback) callbacks.add( callback );
		var that = this;

		var windowHeight,
			windowWidth,
			padTop,
			padBottom,
			padLeft,
			padRight,
			$image,
			preloader;
		// Get the window width and height.
		windowHeight = $(window).height();
		windowWidth  = $(window).width();

		// Get the top, bottom, right, and left padding
		padTop    = parseInt( that.$element.find('.lightbox-content').css('padding-top')    , 10);
		padBottom = parseInt( that.$element.find('.lightbox-content').css('padding-bottom') , 10);
		padLeft   = parseInt( that.$element.find('.lightbox-content').css('padding-left')   , 10);
		padRight  = parseInt( that.$element.find('.lightbox-content').css('padding-right')  , 10);

		// Load the image, we have to do this because if the image isn't already loaded we get a bad size
		$image    = that.$element.find('.lightbox-content').find('img:first');
		preloader = new Image;
		preloader.onload = function()
		{
			//$image.width = preloader.width;
			//$image.height = preloader.height;
			//return _this.sizeContainer(preloader.width, preloader.height);

			// The image could be bigger than the window, that is an issue.
			if( (preloader.width + padLeft + padRight) >= windowWidth)
			{
				var originalWidth = preloader.width;
				var originalHeight = preloader.height;
				preloader.width = windowWidth - padLeft - padRight;
				preloader.height = originalHeight / originalWidth * preloader.width;
			}

			if( (preloader.height + padTop + padBottom) >= windowHeight)
			{
				var originalWidth = preloader.width;
				var originalHeight = preloader.height;
				preloader.height = windowHeight - padTop - padBottom;
				preloader.width = originalWidth / originalHeight * preloader.height;
			}

			that.$element.css({
				'position': 'fixed',
				'width': preloader.width + padLeft + padRight,
				'height': preloader.height + padTop + padBottom,
				'top' : (windowHeight / 2) - ( (preloader.height + padTop + padBottom) / 2),
				'left' : '50%',
				'margin-left' : -1 * (preloader.width +  + padLeft + padRight) / 2
			});

			// We have everything sized!
			callbacks.fire();
		};
		preloader.src = $image.attr('src');
	};

/* LIGHTBOX PLUGIN DEFINITION
 * ======================= */

	var old = $.fn.lightbox

	$.fn.lightbox = function (option)
	{
		return this.each(function ()
		{
			var $this   = $(this);
			var data    = $this.data('lightbox');
			var options = $.extend({}, $.fn.lightbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('lightbox', (data = new Lightbox(this, options)));

			if (typeof option == 'string')
				data[option]()
			else if (options.show)
				data.show()
		});
	};

	$.fn.lightbox.defaults = {
		backdrop: true,
		keyboard: true,
		show: true
	};

	$.fn.lightbox.Constructor = Lightbox;

/* LIGHTBOX NO CONFLICT
  * ================= */

  $.fn.lightbox.noConflict = function () {
	$.fn.lightbox = old
	return this
  }


/* LIGHTBOX DATA-API
 * ================== */

	$(document).on('click.lightbox.data-api', '[data-toggle="lightbox"]', function (e)
	{
		var $this = $(this);
		var href  = $this.attr('href');
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
		var option = $target.data('lightbox') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data());

		e.preventDefault();

		$target
			.lightbox(option)
			.one('hide', function () 
			{
				$this.focus()
			});
	})

}(window.jQuery);
