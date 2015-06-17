var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
	if(err) { 
		throw err;
	}

	var data = db.collection('students');

	var query = {};
	
	data.count(query, function(err, count) {
		
		var cursor = data.find(query);

		cursor.each(function(err, doc) {
			if(err) {
				throw err;
			}
			
			if(doc != null) {
				process(db, data, count, doc);
			}
		});
    });
	
});

var totalCount = 0;

function process(db, data, count, doc) {
	if (db == null || doc == null) { 
		return;
	}
	
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
	
	var targetQuery = { '_id' : doc['_id'] };

	db.collection('students').update(targetQuery, doc, function(err, updatedDocumentsTotal) {
		if(err) {
			throw err;
		}
	
		console.log(doc);
		
		totalCount++;

		if (totalCount >= count) {
			doAggregate(db, data);
		}
	});
}

function doAggregate(db, data) {
	var command = [{ '$unwind' : '$scores' } , { '$group' : { '_id' : '$_id' , 'average' : { $avg : '$scores.score' } } } , { '$sort' : { 'average' : -1 } } , { '$limit' : 1 }];
    data.aggregate(command, function(err, result) {
		if (result.length > 0) {
			console.log("\nThe final highest average in the class is student " + result[0]._id + " with score " + result[0].average);
		} else {
			console.log("\nNo average was found.");
		}
		db.close();
	});
}

