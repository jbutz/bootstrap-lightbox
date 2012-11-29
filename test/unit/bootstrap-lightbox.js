$(function () {

		module("bootstrap-lightbox")

			test("should be defined on jquery object", function () {
				var div = $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
				ok(div.lightbox, 'lightbox method is defined')
			})

			test("should return element", function () {
				var div = $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
				ok(div.lightbox() == div, 'document.body returned')
				$('#lightbox-test').remove()
			})

			test("should expose defaults var for settings", function () {
				ok($.fn.lightbox.defaults, 'default object exposed')
			})

			test("should insert into dom when show method is called", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
					.bind("shown", function () {
						ok($('#lightbox-test').length, 'lightbox insterted into dom')
						$(this).remove()
						start()
					})
					.lightbox("show")
			})

			test("should fire show event", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
					.bind("show", function () {
						ok(true, "show was called")
					})
					.bind("shown", function () {
						$(this).remove()
						start()
					})
					.lightbox("show")
			})

			test("should not fire shown when default prevented", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
					.bind("show", function (e) {
						e.preventDefault()
						ok(true, "show was called")
						start()
					})
					.bind("shown", function () {
						ok(false, "shown was called")
					})
					.lightbox("show")
			})

			test("should hide lightbox when hide is called", function () {
				stop()
				$.support.transition = false

				var div = $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
					.bind("shown", function () {
						ok($('#lightbox-test').is(":visible"), 'lightbox visible')
						ok($('#lightbox-test').length, 'lightbox insterted into dom')
						$(this).lightbox("hide")
					})
					.bind("hidden", function() {
						ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
						$('#lightbox-test').remove()
						start()
					})
					.lightbox("show")
			})

			test("should toggle when toggle is called", function () {
				stop()
				$.support.transition = false
				var div =  $("<div id='lightbox-test'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
				div
					.bind("shown", function () {
						ok($('#lightbox-test').is(":visible"), 'lightbox visible')
						ok($('#lightbox-test').length, 'lightbox insterted into dom')
						div.lightbox("toggle")
					})
					.bind("hidden", function() {
						ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
						div.remove()
						start()
					})
					.lightbox("toggle")
			})

			test("should remove from dom when click [data-dismiss=lightbox]", function () {
				stop()
				$.support.transition = false
				var div = $("<div id='lightbox-test'><span class='close' data-dismiss='lightbox'></span><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADElEQVQYV2P4//8/AAX+Av6nNYGEAAAAAElFTkSuQmCC'></div>")
				div
					.bind("shown", function () {
						ok($('#lightbox-test').is(":visible"), 'lightbox visible')
						ok($('#lightbox-test').length, 'lightbox insterted into dom')
						div.find('.close').click()
					})
					.bind("hidden", function() {
						ok(!$('#lightbox-test').is(":visible"), 'lightbox hidden')
						div.remove()
						start()
					})
					.lightbox("toggle")
			})
})