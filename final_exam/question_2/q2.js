use enron;
db.messages.aggregate([
	{$unwind:"$headers.To"},
	
	{ $group: { 
		_id:{originalId:"$_id",sender:"$headers.From",recipient:"$headers.To"}, 
	}},
	
	{ $group: { 
		_id:{sender:"$_id.sender",recipient:"$_id.recipient"}, 
		totalInteractions: {$sum:1}
	}},
		
	{$sort: {"totalInteractions":-1}},
	
	{$limit:1}
	
], { "allowDiskUse": true });