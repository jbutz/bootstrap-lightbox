$(function () {

		module("bootstrap-lightbox")

			test("should provide no conflict", function () {
				var lightbox = $.fn.lightbox.noConflict()
				ok(!$.fn.lightbox, 'lightbox was set back to undefined (org value)')
				$.fn.lightbox = lightbox
			})

			test("should be defined on jquery object", function () {
				var div = $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
				ok(div.lightbox, 'lightbox method is defined')
			})

			test("should return element", function () {
				var div = $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
				ok(div.lightbox() == div, 'document.body returned')
				$('#lightbox-test').remove()
			})

			test("should expose defaults var for settings", function () {
				ok($.fn.lightbox.defaults, 'default object exposed')
			})

			test("should insert into dom when show method is called", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
					.on("shown", function () {
						ok($('#lightbox-test').length, 'lightbox insterted into dom')
						$(this).remove()
						start()
					})
					.lightbox("show")
			})

			test("should fire show event", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
					.on("show", function () {
						ok(true, "show was called")
					})
					.on("shown", function () {
						$(this).remove()
						start()
					})
					.lightbox("show")
			})

			test("should not fire shown when default prevented", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
					.on("show", function (e) {
						e.preventDefault()
						ok(true, "show was called")
						start()
					})
					.on("shown", function () {
						ok(false, "shown was called")
					})
					.lightbox("show")
			})

			test("should hide lightbox when hide is called", function () {
				stop()
				$.support.transition = false

				var div = $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
					.on("shown", function () {
						ok($(this).is(":visible"), 'lightbox visible')
						ok($(this).length, 'lightbox insterted into dom')
						$(this).lightbox("hide")
					})
					.on("hidden", function() {

						ok($(this).is(":hidden"), 'lightbox hidden')
						$(this).remove()
						start()
					})
					.lightbox("show")
			})

			test("should toggle when toggle is called", function () {
				stop()
				$.support.transition = false
				var div =  $("<div id='lightbox-test'><div class='lightbox-content'><img src='pixel.png'></div></div>")
				div
					.on("shown", function () {
						ok($(this).is(":visible"), 'lightbox visible')
						ok($(this).length, 'lightbox insterted into dom')
						div.lightbox("toggle")
					})
					.on("hidden", function() {
						ok($(this).is(":hidden"), 'lightbox hidden')
						div.remove()
						start()
					})
					.lightbox("toggle")
			})

			test("should remove from dom when click [data-dismiss=lightbox]", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><span class='close' data-dismiss='lightbox'></span><div class='lightbox-content'><img src='pixel.png'></div></div>")
				div
					.on("shown", function () {
						ok($(this).is(":visible"), 'lightbox visible')
						ok($(this).length, 'lightbox insterted into dom')
						div.find('.close').click()
					})
					.on("hidden", function() {
						ok($(this).is(":hidden"), 'lightbox hidden')
						div.remove()
						start()
					})
					.lightbox("toggle")
			})
})