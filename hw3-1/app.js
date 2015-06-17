var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
	if(err) { 
		throw err;
	}

	var data = db.collection('students');

	var cursor = data.find({});

	cursor.each(function(err, doc) {
		if(err) {
			throw err;
		}
		
		if(doc == null) {
			return db.close();
		} else {
			process(db, doc);
		}
	});
	
});

function process(db, doc) {
	if (db == null || doc == null) { 
		return;
	}
	
	console.log("BEFORE:");
	console.log(doc);
	
	var dataArray = doc["scores"];
	
	var homework1 = null;
	var homework2 = null;
	
	var finalScores = [];
	
	for(index = 0; index < dataArray.length; index++) {
		if (dataArray[index].type == "homework") {
			if (homework1 == null) {
				homework1 = dataArray[index];
			} else {
				homework2 = dataArray[index];
			}
		} else {
			finalScores.push(dataArray[index]);
		}
	}
	
	if (homework2 == null || homework1.score >= homework2.score) {
		finalScores.push(homework1);
	} else {
		finalScores.push(homework2);
	}
	
	doc["scores"] = finalScores;
	
	var query = { '_id' : doc['_id'] };

	db.collection('students').update(query, doc, function(err, updatedDocumentsTotal) {
		console.log("AFTER:");
		console.log(doc);
	});
}