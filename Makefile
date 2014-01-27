bundle:
	@./node_modules/.bin/browserify . -d -o bundle.js

.PHONY: bundle
