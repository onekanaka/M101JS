var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');

	// Lets find the number of States available
	var stateCount = data.distinct("State", function(err, stateArray){
	
		// Lets get all the documents available in the "data" collection
		var cursor = data.find({});
		
		// Lets sort the documents as ascending State names, and descending Temperature for each State
		cursor.sort([['State', 1], ['Temperature', -1]]);

		// Flag indicating if we found a different state than the one currently being manipulated
		var stateName = "";
		// Flag that tells us no more States are left to update
		var saveCounter = 0;
		
		cursor.each(function(err, doc) {
			if(err) throw err;
			if(doc == null) {
				return;
			}
			
			if (doc.State != stateName) {
				stateName = doc.State;
				
				console.log("Found the document with highest temperature for \""+ doc.State + "\". Saving the new field...");
				
				var query = { '_id' : doc['_id'] };
				doc['month_high'] = true;

				db.collection('data').update(query, doc, function(err, updatedDocumentsTotal) {
					if(err) throw err;

					if (updatedDocumentsTotal > 0) {
						console.dir("Successfully updated the " + doc.State + " document!");
					}
					
					saveCounter++;
					
					// We know the number of States available. 
					// If we already found them all, we close the database connection
					if (saveCounter == stateArray.length) {
						return db.close();
					}
				});
			}
		});
	
	});

});
