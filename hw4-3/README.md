# M101JS Homework 4-3

To test this application, first you need to have `mongod` running in your command line.

Make sure you don't have already a `blog` db, if you do, run inside the mongo shell:
```
use blog
db.posts.drop()
```

After that, go to a command line pointing to this folder's path, and run the next command to load all the data from `posts.json`:

```
mongoimport -d blog -c posts < posts.json
```

After it is done, run this:

```
mongo < hw4-3.js
```

The neccesary indexes will be created. You can test this by using the instructions for validation below.

#Original README

To check whether you have added the right index on the posts collection, run
	cd validate
	npm install
	node hw4-3_validate.js
You don't need to have the blog running for validate to succeed.
You might want to look at the blog code to see what queries it does to the posts collection. they need to be fast.
Need to import posts.json.
