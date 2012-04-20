/*
/* =========================================================
 * bootstrap-lightbox.js v0.2
 *
 * HEAVILY based off bootstrap-modal.js v2.0.2
 * =========================================================
 * Copyright 2012 Jason Butz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
$(window).load(function()
{
!function( $ ){


  "use strict"

 /* LIGHTBOX CLASS DEFINITION
  * ====================== */

  var Lightbox = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="lightbox"]', 'click.dismiss.lightbox', $.proxy(this.hide, this))
	//
	var that = this;
	// Clone the element
	that.$clone = that.$element.filter(':first').clone().css(
	{
		'position': 'absolute',
		'top'     : -2000,
		'display' : 'block',
		'visibility': 'visible',
		'opacity': 100
	}).removeClass('fade').appendTo('body');
	that.$h = that.$clone.height();//this.$element.height();
	that.$w = that.$clone.width();//this.$element.width();
	that.$clone.remove();
	that.$element.css({
		"position": "fixed",
		"left": ( $(window).width()  / 2 ) - ( that.$w / 2 ),
		"top":  ( $(window).height() / 2 ) - ( that.$h / 2 )
	});
	//
  }

  Lightbox.prototype = {

      constructor: Lightbox

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position
			
          that.$element
            .show()
			
		//that.$h = that.$element.find('.lightbox-content').height();
		//that.$w = that.$element.find('.lightbox-content').width();
		//that.$element.css({
		//	"position": "fixed",
		//	"left": ( $(window).width()  / 2 ) - ( that.$w / 2 ),
		//	"top":  ( $(window).height() / 2 ) - ( that.$h / 2 )
		//});
		
		
          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function ()
			{
				
				that.$element.trigger('shown')
			}) : that.$element.trigger('shown')
        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()
		if($(e.target).is('a')) return
        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* LIGHTBOX PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)
	  this.$lightbox = $('div.lightbox')
	  this.$content = $('div.lightbox-content')

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
        this.$lightbox.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.lightbox', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.lightbox')
    }
  }


 /* LIGHTBOX PLUGIN DEFINITION
  * ======================= */

  $.fn.lightbox = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('lightbox')
        , options = $.extend({}, $.fn.lightbox.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('lightbox', (data = new Lightbox(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.lightbox.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.lightbox.Constructor = Lightbox


 /* LIGHTBOX DATA-API
  * ============== */

  $(function () {
    $('body').on('click.lightbox.data-api', '[data-toggle="lightbox"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('lightbox') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.lightbox(option)
    })
  })

}( window.jQuery );
});
