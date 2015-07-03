db.posts.aggregate([
	{$unwind:"$comments"},

	{$group: 
		{
			_id:"$comments.author",
			postTotal: {"$sum":1},
		}
    },

	{$sort: 
		{"postTotal":-1}
    },

    {$limit: 1}
]);