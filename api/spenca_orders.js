(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/spenca_orders',get_all_spenca_orders)
	.post('/spenca_orders',insert_into_spenca_orders)
	.delete('/spenca_orders/:spenca_orders_id',delete_from_spenca_orders)
	.get('/spenca_orders/:spenca_orders_id',get_by_id_from_spenca_orders)
	.put('/spenca_orders/:spenca_orders_id',update_existing_from_spenca_orders)
	;



	function get_all_spenca_orders(req, res){
		db.collection_spenca_orders.find(callback_find);
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

	function delete_from_spenca_orders(req, res){

		console.log(req.params.spenca_orders_id);

		db.collection_spenca_orders.remove(
			{_id: db.ObjectId(req.params.spenca_orders_id)},
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

	function get_by_id_from_spenca_orders(req, res){

		db.collection_spenca_orders.findOne(
			{_id: db.ObjectId(req.params.spenca_orders_id)},
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

	function insert_into_spenca_orders(req, res){
		var object_to_insert = req.body;

		db.collection_spenca_orders.insert(object_to_insert,callback_insert);
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

	function update_existing_from_spenca_orders(req, res){
		db.collection_spenca_orders.update(
			{_id: db.ObjectId(req.params.spenca_orders_id)},
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