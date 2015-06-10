var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');

	var cursor = data.find({"Wind Direction":{"$gte":180,"$lte":360}}).limit(1);
		
	// Lets sort the documents by Temperature ascending 
	cursor.sort([['Temperature', 1]]);

	cursor.each(function(err, doc) {
		if(err) throw err;
		if(doc == null) {
			return;
		}
			
		console.log("\nThe State with the highest temperature is: \""+ doc.State + "\".");
		
		return db.close();
	});
});
