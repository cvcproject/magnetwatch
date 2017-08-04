// Retrieve
var MongoClient = require('mongodb').MongoClient;

var dbSize = 1328
var incrementer = 1

var collection = null

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/LGmagnets", function(err, db) {
	if(err) { return console.dir(err); }
	collection = db.collection('table');
	updateSwarm()
});

function updateSwarm() {
	collection.findOne({number:incrementer}, function(err, item) {
		console.log(item)
		var swarmSizer = require('./magnetinfo.js')(item.uri, 
			function (swarmQuality) {
				collection.update({number:2}, {$set:{swarm:swarmQuality}}, {w:1}, function(err, result) {
					incrementer++
					updateSwarm()
				});
			}
		);
	});
}


