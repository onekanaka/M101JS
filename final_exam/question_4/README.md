Import the data to mongodb using:

`mongoimport --collection posts --db blog posts.json`

Afterwards, navigate to `/blog`, and in the command line install the dependencies and run the application:

	npm install
    node app.js

To validate while the app is still running, navigate to `/validate`, install the dependencies:

`npm install`

and then run the validation script:

`node  final4-validate.js`
