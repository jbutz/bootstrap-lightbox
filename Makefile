BOOTSTRAP = ./docs/assets/css/bootstrap-lightbox.css
BOOTSTRAP_LESS = ./less/bootstrap-lightbox.less
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
	@./node_modules/.bin/recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
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
	@echo "/*!\n* Bootstrap-lightbox.js v0.6.0 \n* Copyright 2013 Jason Butz\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > docs/assets/js/copyright.js
	@cat docs/assets/js/copyright.js js/bootstrap-lightbox.js > docs/assets/js/bootstrap-lightbox.js
	@cat docs/assets/js/copyright.js docs/assets/js/bootstrap-lightbox.min.tmp.js > docs/assets/js/bootstrap-lightbox.min.js
	@rm docs/assets/js/copyright.js docs/assets/js/bootstrap-lightbox.min.tmp.js
	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Bootstrap Lightbox successfully built at ${DATE}."
	@echo "${HR}\n"

#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

test:
	./node_modules/.bin/jshint js/*.js --config js/.jshintrc
	./node_modules/.bin/jshint js/tests/unit/*.js --config js/.jshintrc
	node js/tests/server.js &
	phantomjs js/tests/phantom.js "http://localhost:3000/js/tests"
	kill -9 `cat js/tests/pid.txt`
	rm js/tests/pid.txt

#
# CLEANS THE ROOT DIRECTORY OF PRIOR BUILDS
#

clean:
	rm -r bootstrap

#
# MAKE FOR GH-PAGES 4 FAT & MDO ONLY (O_O  )
#

gh-pages: bootstrap docs
	rm -f docs/assets/bootstrap.zip
	zip -r docs/assets/bootstrap.zip bootstrap
	rm -r bootstrap
	rm -f ../bootstrap-gh-pages/assets/bootstrap.zip
	node docs/build production
	cp -r docs/* ../bootstrap-gh-pages