//mongoimport --db test --collection albums albums.json
//mongoimport --db test --collection images images.json

use test;

print("\nGenerating new indexes...\n\n");

db.albums.createIndex({images:1});
db.images.createIndex({tags:1});

print("\nNew indexes created.\n\nGetting list of images with albums...\n\n");

var result = db.albums.aggregate([
	{$unwind:"$images"},
	{ $group: {
		_id:"$images"
	}},
	{$sort: {"_id":1}}
]);

var array = result.toArray();

print("\nList of images with albums created.\n\nCreating new collection for list of images with albums...\n\n");

db.createCollection("eImages");

db.eImages.insert(array);

print("\nCollection created.\n\nRemoving images without albums from \'images\' collections...\n\n");

var cursor = db.images.find();
var originalCount = db.images.find().count();
var processed = 0;

cursor.forEach( function(myDoc) { 
	var total = db.eImages.find({_id:myDoc._id}).count();
	if (total == 0) {
		db.images.remove({_id:myDoc._id});
	}
	
	processed++;
	var percentage = processed * 100 / originalCount;
	if (percentage % 10 == 0) {
		print("Images processed until now: " + percentage + "%");
	}
} );

db.eImages.drop();

print("\nImages without album have been removed. New images total is " + db.images.find().count() + "\n\n");

print("\nThe total of images with the tag \'kittens\' is " + db.images.find({tags:"kittens"}).count() + "\n\n");


