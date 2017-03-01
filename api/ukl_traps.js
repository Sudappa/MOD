(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/ukl_traps',get_all_ukl_traps)
	.post('/ukl_traps',insert_into_ukl_traps)
	.delete('/ukl_traps/:ukl_traps_id',delete_from_ukl_traps)
	.get('/ukl_traps/:ukl_traps_id',get_by_id_from_ukl_traps)
	.put('/ukl_traps/:ukl_traps_id',update_existing_from_ukl_traps)
	;



	function get_all_ukl_traps(req, res){
		db.collection_ukl_traps.find(callback_find);
		function callback_find(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function delete_from_ukl_traps(req, res){

		console.log(req.params.ukl_traps_id);

		db.collection_ukl_traps.remove(
			{_id: db.ObjectId(req.params.ukl_traps_id)},
			callback_remove
		);
		function callback_remove(err, doc) {
			if( err ){
				console.log("Record NOT deleted");
				res.json(err);
			}else{
	  			console.log("Record DELETED");
				res.json(doc);
	  		} 
		}
	}

	function get_by_id_from_ukl_traps(req, res){

		db.collection_ukl_traps.findOne(
			{_id: db.ObjectId(req.params.ukl_traps_id)},
			callback_findOne
		);
		function callback_findOne(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function insert_into_ukl_traps(req, res){
		var object_to_insert = req.body;

		db.collection_ukl_traps.insert(object_to_insert,callback_insert);
		function callback_insert(err, doc) {
			if( err ){
				console.log("Record NOT inserted");
				res.json(err);
			}else{
	  			console.log("Record INSERTED");
				res.json(doc);
	  		} 
		}
	}

	function update_existing_from_ukl_traps(req, res){
		db.collection_ukl_traps.update(
			{_id: db.ObjectId(req.params.ukl_traps_id)},
			{$set : {
				country_name: req.body.country_name
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED");
				res.json(doc);
	  		} 
		}

	}

};

})();