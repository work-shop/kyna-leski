SASS_SOURCE_DIRECTORY = assets/css/
SASS_TARGET_DIRECTORY = assets/css/
SASS_TARGET_FILE = main.css
JS_SOURCE_DIRECTORY = assets/js/
JS_SOURCE_FILE = main.js
JS_TARGET_DIRECTORY = assets/js/
JS_TARGET_FILE = bundle.js
UGLIFY_OPTIONS = -cm

quiet=true

all: watch

install:
	npm install -g watchify
	npm install -g uglifyjs

watch: sass-watch

sass-watch:
ifeq ($(quiet),true)
	sass --watch --quiet $(SASS_SOURCE_DIRECTORY):$(SASS_TARGET_DIRECTORY) &
else
	sass --watch $(SASS_SOURCE_DIRECTORY):$(SASS_TARGET_DIRECTORY)
endif


js-watch:
	watchify $(JS_SOURCE_DIRECTORY)$(JS_SOURCE_FILE) -o 'uglifyjs $(UGLIFY_OPTIONS) > $(JS_TARGET_DIRECTORY)$(JS_TARGET_FILE)'

clean:
	rm $(SASS_TARGET_DIRECTORY)$(SASS_TARGET_FILE) $(JS_TARGET_DIRECTORY)$(JS_TARGET_FILE) 

