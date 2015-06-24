# M101JS Homework 4-3

To test this application, first you need to have `mongod` running in a command line.

After that, go to a command line pointing to this folder's path, and run the next command to load all the data from `posts.json`:

```
mongoimport -d m101 -c profile < sysprofile.json
```

After it is done, run this:

```
mongo < hw4-4.js
```

The result will be displayed on screen under `millis`.
