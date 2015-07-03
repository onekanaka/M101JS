use test;
db.zips.aggregate([
	{$project: 
		{
			first_char: {$substr : ["$city",0,1]},
			population : "$pop"
		}	 
	},
	
	{$sort: 
		{"first_char":1}
    },
	
	{$match: {first_char: /^\d.*$/}} ,
	
	{$group:
		{
			_id:null, 
			sum:{"$sum":"$population"}
		}
	}
]);