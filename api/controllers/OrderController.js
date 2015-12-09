/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create_order: function(req, res) {
		var product = req.param('product');
		var name = req.param('name');
		var address = req.param('address');
		var tel = req.param('tel');
		var email = req.param('email');
		var delivery = req.param('delivery');
		var text = req.param('text');
		Order.create({
			status: "收到訂單",
			product: product,
			name: name,
			address: address,
			tel: tel,
			email: email,
			delivery: delivery,
			text: text,
		})
		.exec(function(err, cta) {
			if(err) return res.negotiate(err);
			return res.json({ result: 'ok' });
		})
	},

	get_order: function(req, res) {
		if(!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined'){
			return res.view('blank', {
				layout: 'adminLogin'
			})
		}

		Order.find({
		})
		.exec(function(err, ctas) {
			if(err) return res.negotiate(err);
			return res.json({ result: ctas });
		})
	},

	get_order_by_id: function(req, res) {
		var orderID = req.param('orderID');
		Order.find({
			id: orderID
		})
		.exec(function(err, orders) {
			if(err) return res.negotiate(err);
			return res.json({ result: orders });
		})
	},

	order_detail: function(req, res) {
		if(!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined'){
			return res.view('blank', {
				layout: 'adminLogin'
			})
		}
		
		var orderID = req.param('orderID');

		Order.findOne({
			id: orderID
		})
		.exec(function(err, order) {
			return res.view('blank', {
				orderID: order.id,
				layout: 'adminOrderDetail'
			})
		})
		
	},

	update_order: function(req, res) {
		if(!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined'){
			return res.view('blank', {
				layout: 'adminLogin'
			})
		}
		
		var orderID = req.param('orderID');
		Order.update(
			{ id: orderID },
			{ status: "已出貨"}
			)
		.exec(function(err, message) {
			if(err) return res.negotiate(err);
			return res.json({ result: 'ok' });
		})
	},

	delete_order: function(req, res) {
		if(!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined'){
			return res.view('blank', {
				layout: 'adminLogin'
			})
		}
		
		var orderID = req.param('orderID');
		Order.destroy({
			id: orderID
		})
		.exec(function(err, message) {
			if(err) return res.negotiate(err);
			return res.json({ result: 'ok' });
		})
	},
	
};

