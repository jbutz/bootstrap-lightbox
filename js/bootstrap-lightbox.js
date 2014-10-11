
+function ($) { "use strict";

	// LIGHTBOX CLASS DEFINITION
	// ======================

	var Lightbox = function (element, options)
	{
		this.options   = options
		this.$element  = $(element)
		this.$backdrop = null
		this.isShown   = null

		if (this.options.remote) this.$element.load(this.options.remote)
	}

	// We depend upon Twitter Bootstrap's Modal library to simplify things here
	Lightbox.prototype = $.extend({},$.fn.modal.Constructor.prototype);

	Lightbox.prototype.constructor = Lightbox;

	Lightbox.DEFAULTS = {
		backdrop: true,
		keyboard: true,
		show: true
	}

	Lightbox.prototype.show = function (_relatedTarget) 
	{
		var that = this;
		var e    = $.Event('show.bs.lightbox', { relatedTarget: _relatedTarget });

		this.$element.trigger(e);

		if (this.isShown || e.isDefaultPrevented()) return;

		this.isShown = true;

		this.escape();

		this.$element.on('click.dismiss.lightbox', '[data-dismiss="lightbox"]', $.proxy(this.hide, this));

		// This bit is added since we don't display until we have the size
		//  which prevents image jumping
		this.preloadSize(function()
		{
			that.backdrop(function ()
			{
				var transition = $.support.transition && that.$element.hasClass('fade');

				if (!that.$element.parent().length)
				{
					that.$element.appendTo(document.body); // don't move modals dom position
				}

				that.$element.show();

				if (transition)
				{
					that.$element[0].offsetWidth; // force reflow
				}

				that.$element
					.addClass('in')
					.attr('aria-hidden', false);

				that.enforceFocus();

				var e = $.Event('shown.bs.lightbox', { relatedTarget: _relatedTarget });

				transition ?
					that.$element.find('.lightbox-dialog') // wait for modal to slide in
						.one($.support.transition.end, function ()
						{
							that.$element.focus().trigger(e);
						})
						.emulateTransitionEnd(300) :
					that.$element.focus().trigger(e);
			});
		});
	};

	Lightbox.prototype.hide = function (e, slide)
	{
		if (e) e.preventDefault();

		e = $.Event('hide.bs.lightbox');

		this.$element.trigger(e);

		if (!this.isShown || e.isDefaultPrevented()) return;

		this.isShown = false;

		this.escape();

		$(document).off('focusin.bs.lightbox');

		this.$element
			.removeClass('in')
			.attr('aria-hidden', true)
			.off('click.dismiss.lightbox');

		$.support.transition && this.$element.hasClass('fade') ?
			this.$element
				.one($.support.transition.end, $.proxy(this.hideModal(slide), this))
				.emulateTransitionEnd(300) :
			this.hideModal(slide);
	};

	Lightbox.prototype.enforceFocus = function () {
		$(document)
			.off('focusin.bs.lightbox') // guard against infinite focus loop
			.on('focusin.bs.lightbox', $.proxy(function (e)
			{
				if (this.$element[0] !== e.target && !this.$element.has(e.target).length)
				{
					this.$element.focus();
				}
			}, this));
	};

	Lightbox.prototype.escape = function ()
	{
		if (this.isShown && this.options.keyboard)
		{
			this.$element.on('keyup.dismiss.bs.lightbox', $.proxy(function (e)
			{
				e.which == 27 && this.hide();
			}, this));
		}
		else if (!this.isShown)
		{
			this.$element.off('keyup.dismiss.bs.lightbox');
		}
	}

	Lightbox.prototype.hideModal = function (slide) 
	{
		var that = this;
		this.$element.hide();
		this.backdrop(function ()
		{
			that.removeBackdrop();

			// Don't trigger hidden event if sliding between lightboxes
			if(!slide) that.$element.trigger('hidden.bs.lightbox');
		});
	};

	Lightbox.prototype.backdrop = function (callback)
	{
		var that    = this
		var animate = this.$element.hasClass('fade') ? 'fade' : ''
		if (this.isShown && this.options.backdrop)
		{
			var doAnimate = $.support.transition && animate;

			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
				.appendTo(document.body);

			this.$element.on('click.dismiss.lightbox', $.proxy(function (e)
			{
				if (e.target !== e.currentTarget) return;
				this.options.backdrop == 'static'
					? this.$element[0].focus.call(this.$element[0])
					: this.hide.call(this);
			}, this));

			if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

			this.$backdrop.addClass('in');

			if (!callback) return;

			doAnimate ?
				this.$backdrop
					.one($.support.transition.end, callback)
					.emulateTransitionEnd(150) :
				callback();

		}
		else if (!this.isShown && this.$backdrop)
		{
			this.$backdrop.removeClass('in');

			$.support.transition && this.$element.hasClass('fade')?
				this.$backdrop
					.one($.support.transition.end, callback)
					.emulateTransitionEnd(150) :
				callback();

		}
		else if (callback)
		{
			callback();
		}
	};

    Lightbox.prototype.setSize = function(width, height) {
        var originalWidth,
            originalHeight;

        var windowHeight = $(window).height();
        var windowWidth  = $(window).width();

        var padTop = parseInt(this.$element.find('.lightbox-content')
            .css('padding-top'), 10);
        var padBottom = parseInt(this.$element.find('.lightbox-content')
            .css('padding-bottom'), 10);
        var padLeft = parseInt(this.$element.find('.lightbox-content')
            .css('padding-left'), 10);
        var padRight = parseInt(this.$element.find('.lightbox-content')
            .css('padding-right'), 10);

        // The image could be bigger than the window, that is an issue.
        if( (width + padLeft + padRight) >= windowWidth)
        {
            originalWidth = width;
            originalHeight = height;
            width = windowWidth - padLeft - padRight;
            height = originalHeight / originalWidth * width;
        }

        if( (height + padTop + padBottom) >= windowHeight)
        {
            originalWidth = width;
            originalHeight = height;
            height = windowHeight - padTop - padBottom;
            width = originalWidth / originalHeight * height;
        }

        this.$element.css({
            'position': 'fixed',
            'width': width + padLeft + padRight,
            'height': height + padTop + padBottom,
            'top' : (windowHeight / 2) - ( (height + padTop + padBottom) / 2),
            'left' : '50%',
            'margin-left' : -1 * (width + padLeft + padRight) / 2
        });
        this.$element.find('.lightbox-content').css({
            'width': width,
            'height': height
        });
    };

    Lightbox.prototype.preloadSize = function(callback)
    {
        var callbacks = $.Callbacks();
        if(callback) callbacks.add( callback );

        // first check preset width and height.
        if(this.options.width && this.options.height) {
            this.setSize(this.options.width, this.options.height);
            callbacks.fire();
            return;
        }

        // Load the image, we have to do this because if the image isn't already loaded we get a bad size
        var that = this, preloader;
        var $image = this.$element.find('.lightbox-content img:first');
        if($image.length) {
            preloader = new Image();
            preloader.onload = function() {
                that.setSize(preloader.width, preloader.height);
                callbacks.fire();
            };
            preloader.src = $image.attr('src');
            return;
        }
        // If no image is present check for video presence
        var $video = this.$element.find('.lightbox-content video:first');
        if($video.length) {
            preloader = document.createElement('video');
            $(preloader).on('loadedmetadata', function() {
                that.setSize(preloader.videoWidth, preloader.videoHeight);
                callbacks.fire();
            });
            preloader.preload = 'metadata';
            preloader.src = $video.find('source:first').attr('src');
            return;
        }
        throw new Error("If no video or image is included in the lightbox, a pre-set width or height must be specified.");
    };

	Lightbox.prototype.slide = function(direction)
	{
		var that = this;

		that.hide(that.event, true);

		if (direction == 'next' && that.$element.next('.lightbox').length) {
			that.$element.next('.lightbox').lightbox('show');
		} else if(direction == 'prev' && that.$element.prev('.lightbox').length) {
			that.$element.prev('.lightbox').lightbox('show');
		} else {
			// Trigger hidden event because there is no next / previous slide
			that.$element.trigger('hidden.bs.lightbox');
		}
	}


	// LIGHTBOX PLUGIN DEFINITION
	// =======================

	var old = $.fn.lightbox

	$.fn.lightbox = function (option, _relatedTarget)
	{
		return this.each(function ()
		{
			var $this   = $(this);
			var data    = $this.data('bs.lightbox');
			var options = $.extend({}, Lightbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

			if (!data) $this.data('bs.lightbox', (data = new Lightbox(this, options)));
			if (typeof option == 'string') data[option](_relatedTarget);
			else if (options.show) data.show(_relatedTarget)
		})
	}

	$.fn.lightbox.Constructor = Lightbox;


	// MODAL NO CONFLICT
	// =================

	$.fn.lightbox.noConflict = function ()
	{
		$.fn.lightbox = old;
		return this;
	}


	// MODAL DATA-API
	// ==============

	$(document).on('click.bs.lightbox.data-api', '[data-toggle="lightbox"]', function (e)
	{
		var $this   = $(this);
		var href    = $this.attr('href');
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
		var option  = $target.data('lightbox') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

		e.preventDefault()

		$target
			.lightbox(option, this)
			.one('hide', function ()
			{
				$this.is(':visible') && $this.focus()
			});
	});

	$(document).on('click', '.lightbox-control', function (e)
	{
		e.preventDefault();

		var $this = $(this);

		$this.parents('.lightbox')
			.lightbox('slide', $(this).data('lightbox-slide'));
	});

	$(document)
		.on('show.bs.lightbox',  '.lightbox', function () { $(document.body).addClass('lightbox-open') })
		.on('hidden.bs.lightbox', '.lightbox', function () { $(document.body).removeClass('lightbox-open') })

}(window.jQuery);
