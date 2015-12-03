/**
 * FarmerController
 *
 * @description :: Server-side logic for managing farmers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create_farmer: function(req, res) {
		var name = req.param('name');
		var location = req.param('location');
		var text = req.param('text');
		Farmer.create({
			name: name,
			location: location,
			text: text,
		})
		.exec(function(err, cta) {
			if(err) return res.negotiate(err);
			return res.json({ result: 'ok' });
		})
	},

	get_farmer: function(req, res) {
		Farmer.find({
		})
		.exec(function(err, ctas) {
			if(err) return res.negotiate(err);
			return res.json({ result: ctas });
		})
	},

	delete_farmer: function(req, res) {
		if(!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined'){
			return res.view('blank', {
				layout: 'adminLogin'
			})
		}
		
		var farmerID = req.param('farmerID');
		Farmer.destroy({
			id: farmerID
		})
		.exec(function(err, farmer) {
			if(err) return res.negotiate(err);
			return res.json({ result: 'ok' });
		})
	},
	
};

