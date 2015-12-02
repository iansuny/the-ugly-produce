/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create_message: function(req, res) {
		var name = req.param('name');
		var email = req.param('email');
		var text = req.param('text');
		Message.create({
			name: name,
			email: email,
			text: text,
		})
		.exec(function(err, cta) {
			if(err) return res.negotiate(err);
			return res.json({ result: 'ok' });
		})
	},

	get_message: function(req, res) {
		if(!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined'){
			return res.view('blank', {
				layout: 'adminLogin'
			})
		}

		Message.find({
		})
		.exec(function(err, ctas) {
			if(err) return res.negotiate(err);
			return res.json({ result: ctas });
		})
	}
	
};

