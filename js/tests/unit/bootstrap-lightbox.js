$(function () {

  module("bootstrap-lightbox")

    test("should provide no conflict", function () {
      var lightbox = $.fn.lightbox.noConflict()
      ok(!$.fn.lightbox, 'lightbox was set back to undefined (org value)')
      $.fn.lightbox = lightbox
    })

    test("should be defined on jquery object", function () {
      var div = $("<div id='lightbox-test'></div>")
      ok(div.lightbox, 'lightbox method is defined')
    })

    test("should return element", function () {
      var div = $("<div id='lightbox-test'></div>")
      ok(div.lightbox() == div, 'document.body returned')
      $('#lightbox-test').remove()
    })

    test("should expose defaults var for settings", function () {
      ok($.fn.lightbox.Constructor.DEFAULTS, 'default object exposed')
    })

    test("should insert into dom when show method is called", function () {
      stop()
      $.support.transition = false
      $("<div id='lightbox-test'></div>")
        .on("shown.bs.lightbox", function () {
          ok($('#lightbox-test').length, 'lightbox inserted into dom')
          $(this).remove()
          start()
        })
        .lightbox("show")
    })

    test("should fire show event", function () {
      stop()
      $.support.transition = false
      $("<div id='lightbox-test'></div>")
        .on("show.bs.lightbox", function () {
          ok(true, "show was called")
        })
        .on("shown.bs.lightbox", function () {
          $(this).remove()
          start()
        })
        .lightbox("show")
    })

    test("should not fire shown when default prevented", function () {
      stop()
      $.support.transition = false
      $("<div id='lightbox-test'></div>")
        .on("show.bs.lightbox", function (e) {
          e.preventDefault()
          ok(true, "show was called")
          start()
        })
        .on("shown.bs.lightbox", function () {
          ok(false, "shown was called")
        })
        .lightbox("show")
    })

    test("should hide lightbox when hide is called", function () {
      stop()
      $.support.transition = false

      $("<div id='lightbox-test'></div>")
        .on("shown.bs.lightbox", function () {
          ok($('#lightbox-test').is(":visible"), 'lightbox visible')
          ok($('#lightbox-test').length, 'lightbox inserted into dom')
          $(this).lightbox("hide")
        })
        .on("hidden.bs.lightbox", function() {
          ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
          $('#lightbox-test').remove()
          start()
        })
        .lightbox("show")
    })

    test("should toggle when toggle is called", function () {
      stop()
      $.support.transition = false
      var div = $("<div id='lightbox-test'></div>")
      div
        .on("shown.bs.lightbox", function () {
          ok($('#lightbox-test').is(":visible"), 'lightbox visible')
          ok($('#lightbox-test').length, 'lightbox inserted into dom')
          div.lightbox("toggle")
        })
        .on("hidden.bs.lightbox", function() {
          ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
          div.remove()
          start()
        })
        .lightbox("toggle")
    })

    test("should remove from dom when click [data-dismiss=lightbox]", function () {
      stop()
      $.support.transition = false
      var div = $("<div id='lightbox-test'><span class='close' data-dismiss='lightbox'></span></div>")
      div
        .on("shown.bs.lightbox", function () {
          ok($('#lightbox-test').is(":visible"), 'lightbox visible')
          ok($('#lightbox-test').length, 'lightbox inserted into dom')
          div.find('.close').click()
        })
        .on("hidden.bs.lightbox", function() {
          ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
          div.remove()
          start()
        })
        .lightbox("toggle")
    })

    test("should allow lightbox close with 'backdrop:false'", function () {
      stop()
      $.support.transition = false
      var div = $("<div>", { id: 'lightbox-test', "data-backdrop": false })
      div
        .on("shown.bs.lightbox", function () {
          ok($('#lightbox-test').is(":visible"), 'lightbox visible')
          div.lightbox("hide")
        })
        .on("hidden.bs.lightbox", function() {
          ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
          div.remove()
          start()
        })
        .lightbox("show")
    })

    test("should close lightbox when clicking outside of lightbox-content", function () {
      stop()
      $.support.transition = false
      var div = $("<div id='lightbox-test'><div class='contents'></div></div>")
      div
        .bind("shown.bs.lightbox", function () {
          ok($('#lightbox-test').length, 'lightbox insterted into dom')
          $('.contents').click()
          ok($('#lightbox-test').is(":visible"), 'lightbox visible')
          $('#lightbox-test').click()
        })
        .bind("hidden.bs.lightbox", function() {
          ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
          div.remove()
          start()
        })
        .lightbox("show")
    })

    test("should trigger hide event once when clicking outside of lightbox-content", function () {
      stop()
      $.support.transition = false
      var div = $("<div id='lightbox-test'><div class='contents'></div></div>")
      var triggered
      div
        .bind("shown.bs.lightbox", function () {
          triggered = 0
          $('#lightbox-test').click()
        })
        .one("hidden.bs.lightbox", function() {
          div.lightbox("show")
        })
        .bind("hide.bs.lightbox", function () {
          triggered += 1
          ok(triggered === 1, 'lightbox hide triggered once')
          start()
        })
        .lightbox("show")
    })

    test("should close reopened lightbox with [data-dismiss=lightbox] click", function () {
      stop()
      $.support.transition = false
      var div = $("<div id='lightbox-test'><div class='contents'><div id='close' data-dismiss='lightbox'></div></div></div>")
      div
        .bind("shown.bs.lightbox", function () {
          $('#close').click()
          ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
        })
        .one("hidden.bs.lightbox", function() {
          div.one('hidden.bs.lightbox', function () {
            start()
          }).lightbox("show")
        })
        .lightbox("show")

      div.remove()
    })
})