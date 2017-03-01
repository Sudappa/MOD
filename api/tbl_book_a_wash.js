(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/tbl_book_a_wash',get_all_tbl_book_a_wash)
	.post('/tbl_book_a_wash',insert_into_tbl_book_a_wash)
	.delete('/tbl_book_a_wash/:tbl_book_a_wash_id',delete_from_tbl_book_a_wash)
	.get('/tbl_book_a_wash/:tbl_book_a_wash_id',get_by_id_from_tbl_book_a_wash)
	.put('/tbl_book_a_wash/:tbl_book_a_wash_id',update_existing_from_tbl_book_a_wash)
	.put('/tbl_book_a_wash/update_my_orders/:user_id', update_my_orders)
	.put('/tbl_book_a_wash/update_profile/:user_id', update_profile)
	.put('/tbl_book_a_wash/update_item_of_my_orders/:user_id', update_item_of_my_orders)
	;



	function get_all_tbl_book_a_wash(req, res){
		db.collection_tbl_book_a_wash.find(callback_find);
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

	function delete_from_tbl_book_a_wash(req, res){

		console.log(req.params.tbl_book_a_wash_id);

		db.collection_tbl_book_a_wash.remove(
			{_id: db.ObjectId(req.params.tbl_book_a_wash_id)},
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

	function get_by_id_from_tbl_book_a_wash(req, res){

		db.collection_tbl_book_a_wash.findOne(
			{_id: db.ObjectId(req.params.tbl_book_a_wash_id)},
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

	function insert_into_tbl_book_a_wash(req, res){
		var object_to_insert = req.body;

		db.collection_tbl_book_a_wash.insert(object_to_insert,callback_insert);
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

	function update_existing_from_tbl_book_a_wash(req, res){
		db.collection_tbl_book_a_wash.update(
			{_id: db.ObjectId(req.params.tbl_book_a_wash_id)},
			{$set : {
				article_title: req.body.article_title,
				article_published_on: req.body.article_published_on,
				article_short_description: req.body.article_short_description,
				article_contents: req.body.article_contents
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

	function update_my_orders(req, res){
		db.collection_tbl_book_a_wash.update(
			{_id: db.ObjectId(req.params.user_id)},
			{$push: { 
				my_orders: req.body 
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED (MY ORDERS)");
				res.json(doc);
	  		} 
		}

	}

	function update_profile(req, res){
		db.collection_tbl_book_a_wash.update(
			{_id: db.ObjectId(req.params.user_id)},
			{$set: { 
				profile: req.body 
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED (MY ORDERS)");
				res.json(doc);
	  		} 
		}

	}

	function update_item_of_my_orders(req, res){
		db.collection_tbl_book_a_wash.update(
			// {user_id : 123456 , "items.item_name" : "my_item_two" },
			{
				_id: db.ObjectId(req.params.user_id),
				// "cart._id" : req.body._id
			},
			{$set: { 
				my_orders: req.body 
				// cart: { _id : req.body._id }
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED (CART UPDATE)");
				res.json(doc);
	  		} 
		}

	}

};

})();