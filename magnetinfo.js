// Magnetinfo
// Takes a Magnet link, and estimates the quality of the swarm
// The highest number of peers

module.exports = function monitorMagnet(arg1, fcallback) {
	var trackerlist = require('./trackerlist.js');
	var torrentStream = require('torrent-stream', {
		trackers: trackerlist.getList()
	});
	progress = 0
	console.log(progress++)

	var engine = torrentStream(arg1)
	engine.on('ready', function() {
		filesCount = engine.files.length;
		engine.files.forEach(function(file) {
		});
		setTimeout(torrentInfo, collectionFreq);
	});
	console.log(progress++)

	var collectionCounter = 0;
	var collectionLimit = 3
	var collectionFreq = 2000
	highest = 0;

	function torrentInfo() {
		console.log(progress++)
		totalPeers = engine.swarm.wires
		active = totalPeers.length
		if(active > highest) {
			highest = active;
		}
		collectionCounter++

		if(collectionCounter <= collectionLimit) {
			setTimeout(torrentInfo, collectionFreq);
		} else {
			console.log(progress++)
			console.log(highest)
			fcallback(highest)
		}
	}
	console.log(progress++)
}