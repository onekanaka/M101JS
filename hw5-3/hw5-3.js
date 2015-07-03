use test;
db.grades.aggregate([
	{$unwind:"$scores"},
	
	{ $group: { 
		_id:{class_id:"$class_id",student_id:"$student_id"}, 
		"noQuizScores": { 
			$push: {
				"$cond": [
					{ "$ne": [ "$scores.type", "quiz" ] },
					"$scores.score",
					null
				]					
			}
		}
	}},
	
	{$unwind:"$noQuizScores"},
	
	{ "$match": { "noQuizScores": { "$ne": null } } },
	
	{ $group: { 
		_id:{class_id:"$_id.class_id",student_id:"$_id.student_id"}, 
		averageScore:{$avg:"$noQuizScores"}
	}},
	
	{$group: {
		_id:"$_id.class_id",
		average:{$avg:"$averageScore"}
	}},
	
	{$sort: {"average":-1}},
	
	{$limit: 1}
]);