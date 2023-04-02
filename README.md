# Issue

Regression identified between versions 11.14.0 and 11.15.0 of stripe SDK; 
HTTP requests instantiated by the Stripe SDK are no longer recognized and intercepted by Nock, 
a standard unit test helper that allows to intercept and mock HTTP responses

# How to reproduce
Run `yarn` to install the dependencies; run `yarn test` to launch the unit tests, that fail with recent versions of Stripe