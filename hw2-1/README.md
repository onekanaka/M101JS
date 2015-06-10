# M101JS Homework 2-1

To test this application, first you need to have `mongod` running in your command line.

After that, open a new command line pointing to this folder's path, and run the next command to load all the weather data from `weather_data.csv`:

```
mongoimport --type csv --headerline weather_data.csv -d weather -c data
```

After it is done, connect to your MongoDB instance by running  `mongo`, and make sure to run these commands in the mongo shell:

```
> use weather
> db.data.find().count()
> 2963
```

You should see the 2963 documents total, indicating that the importing process was successful.

Next you will need to position yourself again where our `app.js` is located for homework 2-1, next to a `package.json`.

If you don't have the node modules installed, first run:

```
npm install
```

And then:

```
node app.js
```

The result for this homework should be displayed in the command line.
