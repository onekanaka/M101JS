Import the data to mongodb using:

	mongoimport --db test --collection albums albums.json
    mongoimport --db test --collection images images.json

Afterwards, run the script with `mongod` already running in the background:

`mongo < q7.js`

The result will be printed on the screen.
