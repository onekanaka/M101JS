Download the enron dataset from [this link](https://s3.amazonaws.com/edu-downloads.10gen.com/enron/enron.zip), and restore it to mongodb using:

`mongorestore --collection messages --db enron dump/enron/messages.bson`

Afterwards, run the script with `mongod` already running in the background:

`mongo < q3.js`

The result will be printed on the screen.

To validate, install the dependencies:

`npm install`

and then run the validation script:

`node final3-validate.js`
