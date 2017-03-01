(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/mod_case_list',get_all_mod_case_list)
	.post('/mod_case_list',insert_into_mod_case_list)
	.delete('/mod_case_list/:mod_case_list_id',delete_from_mod_case_list)
	.get('/mod_case_list/:mod_case_list_id',get_by_id_from_mod_case_list)
	.put('/mod_case_list/:mod_case_list_id',update_existing_from_mod_case_list)
	;



	function get_all_mod_case_list(req, res){
		db.collection_mod_case_list.find(callback_find);
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

	function delete_from_mod_case_list(req, res){

		console.log(req.params.mod_case_list_id);

		db.collection_mod_case_list.remove(
			{_id: db.ObjectId(req.params.mod_case_list_id)},
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

	function get_by_id_from_mod_case_list(req, res){

		db.collection_mod_case_list.findOne(
			{_id: db.ObjectId(req.params.mod_case_list_id)},
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

	function insert_into_mod_case_list(req, res){
		var object_to_insert = req.body;

		db.collection_mod_case_list.insert(object_to_insert,callback_insert);
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

	function update_existing_from_mod_case_list(req, res){
		db.collection_mod_case_list.update(
			{_id: db.ObjectId(req.params.mod_case_list_id)},
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