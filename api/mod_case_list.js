(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/mod_case_list',get_all_mod_case_list)
	.post('/mod_case_list',insert_into_mod_case_list)
	.delete('/mod_case_list/:mod_case_list_id',delete_from_mod_case_list)
	.get('/mod_case_list/:mod_case_list_id',get_by_id_from_mod_case_list)
	.get('/mod_case_list/get_by_email/:email_id',get_by_email_id_from_mod_case_list)
	.put('/mod_case_list/update_profile/:mod_case_list_id',update_existing_from_mod_case_list1)
	.put('/mod_case_list/push_new_case/:mod_case_list_id1',update_case_using_id)
	;

	function get_all_mod_case_list(req, res){
		db.collection_mod_case_list.find(callback_find);
		function callback_find(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT found");
				res.json(err);
				throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record FOUND");
				res.json(result);
	  		} 
		}
	}

	function delete_from_mod_case_list(req, res){

		console.log(req.params.mod_case_list_id);

		db.collection_mod_case_list.remove(
			{_id: db.ObjectId(req.params.mod_case_list_id)},
			callback_remove
		);
		function callback_remove(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT deleted");
				res.json(err);
				throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record DELETED");
				res.json(result);
	  		} 
		}
	}

	function get_by_id_from_mod_case_list(req, res){

		db.collection_mod_case_list.findOne(
			{_id: db.ObjectId(req.params.mod_case_list_id)},
			callback_FindOne
		);
		function callback_FindOne(err, result) {
			if(result == null){
				console.log("ON ERROR: " + "Record NOT found");
				res.json(err);
				throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record FOUND");
				res.json(result);
	  		} 
		}
	}

	function get_by_email_id_from_mod_case_list(req, res){
		console.log(req.body);
		db.collection_mod_case_list.findOne(
			{email_id: req.params.email_id},
			callback_FindOne
		);
		function callback_FindOne(err, result) {
			if(result == null){
				console.log("ON ERROR: " + "Record NOT found");
				res.json(err);
				// throw err;
			}else{
	  			console.log("ON SUCCESS: " + "Record FOUND");
				res.json(result);
	  		} 
		}
	}

	// function insert_into_mod_case_list(req, res){
	// 	var object_to_insert = req.body;

	// 	db.collection_mod_case_list.insert(object_to_insert, callback_insert);
	// 	function callback_insert(err, result) {
	// 		if(err){
	// 			console.log("ON ERROR: " + "Record NOT inserted");
	// 			res.json(err);
	// 			throw err;
	// 		}else{
	//   			console.log("ON SUCCESS: " + "Record INSERTED");
	// 			res.json(result);
	//   		} 
	// 	}
	// }

	function insert_into_mod_case_list(req, res){


		// db.collection_mod_case_list.insert(req.body, callback_insert);
		// 		function callback_insert(err, result) {
		// 			if(result == null){
		// 				console.log("ON ERROR: " + "Record NOT inserted");
		// 				res.send(err);
		// 			}else{
		// 	  			console.log("ON SUCCESS: " + "Record INSERTED");
		// 				res.json(result);
		// 	  		} 
		// 		}



		// console.log("FUN: " + JSON.stringify(req.body));
		console.log("inside insert_into_mod_case_list function FUN");
		db.collection_mod_case_list.findOne(
			{email_id: req.body.email_id},
			callback_checking
		);
		function callback_checking(err, result) {
			console.log("inside callback_checking function");
			// console.log(result);
			// console.log(err);
			if(result == null){
				db.collection_mod_case_list.insert(req.body, callback_insert);
				function callback_insert(err, result) {
					if(result == null){
						console.log("ON ERROR: " + "Record NOT inserted");
						res.send(err);
					}else{
			  			console.log("ON SUCCESS: " + "Record INSERTED");
						res.json(result);
			  		} 
				}
			}else{
				console.log("User Already Exists");
				res.send("User Already Exists");
	  		} 
		}
	}

	function update_existing_from_mod_case_list(req, res){
		db.collection_mod_case_list.update(
			{_id: db.ObjectId(req.params.mod_case_list_id)},
			{$set : {
				"profile.name": "req.body.name",
				"profile.contact": "req.body.contact",
				"profile.email_id": "req.body.email_id",
				"profile.address": "req.body.address"
			}},
			callback_update 
		);
		function callback_update(err, result) {
			if(err){
				throw err;
				console.log("ON ERROR: " + "Record NOT updated");
				res.json(err);
			}else{
	  			console.log("ON SUCCESS: " + "Record UPDATED");
				res.json(result);
	  		} 
		}

	}

	function update_case_using_id(req,res){
		console.log("inside function update_case_using_id");

		db.collection_mod_case_list.update(
			{ email_id: req.body.email_id },
			{ $push: 
				{ 
					cases : {
				      	court_name : req.body.court_name,
				      	case_number : req.body.case_number,
				      	first_party : req.body.first_party,
				      	second_party : req.body.second_party,
				      	previous_date : req.body.previous_date,
				      	next_date : req.body.next_date,
				      	case_stage : req.body.case_stage
				    }
				} 
			},
			function(err, result) {
				if(result == null){
					console.log("ON ERROR: " + "Record NOT updated");
					res.json(err);
				}else{
		  			console.log("ON SUCCESS: " + "Record UPDATED");
					res.json(result);
		  		} 
			}
		)
	}


	function update_existing_from_mod_case_list1(req, res){
		console.log("inside function update_existing_from_mod_case_list1");
		db.collection_mod_case_list.update(
			{email_id: req.body.email_id},
			{$set : {
				profile:{
					name: req.body.profile.name,
					contact: req.body.profile.contact,
					email_id: req.body.profile.email_id,
					address: req.body.profile.address
				}
			}},
			callback_update 
		);
		function callback_update(err, result) {
			if(err){
				console.log("ON ERROR: " + "Record NOT updated");
				res.json(err);
			}else{
	  			console.log("ON SUCCESS: " + "Record UPDATED");
				res.json(result);
	  		} 
		}

	}

};

})();





