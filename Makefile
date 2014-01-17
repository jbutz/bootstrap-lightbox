DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# BUILD DOCS
#

build:
	@echo "\n${HR}"
	@echo "Building Bootstrap Lightbox..."
	@echo "${HR}\n"
	@./node_modules/.bin/jshint js/*.js --config js/.jshintrc
	@./node_modules/.bin/jshint js/tests/unit/*.js --config js/.jshintrc
	@echo "Running JSHint on javascript...             ${CHECK} Done"
	@./node_modules/.bin/recess --compile less/bootstrap-lightbox.less > docs/assets/css/bootstrap-lightbox.css.tmp
	@./node_modules/.bin/recess --compress less/bootstrap-lightbox.less > docs/assets/css/bootstrap-lightbox.min.css.tmp
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@node docs/build
	@cp js/*.js docs/assets/js/
	@cp js/tests/vendor/jquery.js docs/assets/js/
	@cp js/tests/vendor/bootstrap.js docs/assets/js/
	@cp js/tests/vendor/*.css docs/assets/css/

	@./node_modules/.bin/uglifyjs -nc docs/assets/js/jquery.js > docs/assets/js/jquery.min.js
	@./node_modules/.bin/uglifyjs -nc docs/assets/js/bootstrap.js > docs/assets/js/bootstrap.min.js

	@echo "Compiling documentation...                  ${CHECK} Done"
	@./node_modules/.bin/uglifyjs -nc docs/assets/js/bootstrap-lightbox.js > docs/assets/js/bootstrap-lightbox.min.tmp.js

	@echo "/*!\n* bootstrap-lightbox.js v0.7.0 \n* Copyright 2014 Jason Butz\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > docs/assets/js/copyright.js
	@cat docs/assets/js/copyright.js js/bootstrap-lightbox.js > docs/assets/js/bootstrap-lightbox.js
	@cat docs/assets/js/copyright.js docs/assets/js/bootstrap-lightbox.min.tmp.js > docs/assets/js/bootstrap-lightbox.min.js
	@rm docs/assets/js/copyright.js docs/assets/js/bootstrap-lightbox.min.tmp.js

	@echo "/*!\n* bootstrap-lightbox.css v0.7.0 \n* Copyright 2014 Jason Butz\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > docs/assets/css/copyright.css
	@cat docs/assets/css/copyright.css docs/assets/css/bootstrap-lightbox.css.tmp > docs/assets/css/bootstrap-lightbox.css
	@cat docs/assets/css/copyright.css docs/assets/css/bootstrap-lightbox.min.css.tmp > docs/assets/css/bootstrap-lightbox.min.css
	@rm docs/assets/css/copyright.css docs/assets/css/bootstrap-lightbox.css.tmp  docs/assets/css/bootstrap-lightbox.min.css.tmp

	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Bootstrap Lightbox successfully built at ${DATE}."
	@echo "${HR}\n"

#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

test:
	@echo "\n${HR}"
	@echo "Running Bootstrap Lightbox Tests..."
	@echo "${HR}\n"
	@./node_modules/.bin/jshint js/*.js --config js/.jshintrc
	@echo "Running JSHint on javascript...             ${CHECK} Done"
	@./node_modules/.bin/jshint js/tests/unit/*.js --config js/.jshintrc
	@echo "Running JSHint on javascript tests...       ${CHECK} Done"
	@cd js/tests/; phantomjs run-qunit.js index.html
	@echo "Running QUnit...                            ${CHECK} Done"

#
# MAKE FOR GH-PAGES
#

gh-pages:
	rm -f docs/assets/bootstrap-lightbox.zip
	zip -j docs/assets/bootstrap-lightbox.zip docs/assets/js/bootstrap-lightbox.js docs/assets/bootstrap-lightbox.zip docs/assets/js/bootstrap-lightbox.min.js docs/assets/bootstrap-lightbox.zip docs/assets/css/bootstrap-lightbox.css docs/assets/css/bootstrap-lightbox.min.css
	rm -rf ../bootstrap-lightbox-gh-pages/
	node docs/build
	mkdir ../bootstrap-lightbox-gh-pages
	cp -r docs/* ../bootstrap-lightbox-gh-pages