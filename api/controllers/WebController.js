/**
 * WebController
 *
 * @description :: Server-side logic for managing webs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	indexIO: function(req, res) {
		// console.log(req.getLocale());
		return res.view('blank', {
			layout: 'index'
		})
	},
	actionIO: function(req, res) {
		action = req.param('action');
		//if(typeof(req.session.userId) == 'undefined') //尚未登入
		console.log('user session: ' + action);
		switch(action) {
			case 'index':
				return res.view('blank', {
					layout: 'index',
				})
			case 'farmer':
				return res.view('blank', {
					layout: 'farmer',
				})
			case 'shop':
				return res.view('blank', {
					layout: 'shop',
				})
		}
	},
	
	adminIO: function(req, res) {
		//check if logged in
		//if not logged in, return res.redirect('/login');
		var action = req.param('action');
		if((!req.session.isAdmin || typeof(req.session.isAdmin) == 'undefined') && action!='login'){
			return res.redirect('admin/login')
		}
		switch(action) {
			//when accessing /admin
			case 'login':
				return res.view('blank', {
					layout: 'adminLogin',
				})
			case 'index':
				return res.view('blank', {
					layout: 'admin',
				})
				break;
			case 'farmer':
				return res.view('blank', {
					layout: 'adminFarmer',
				})
				break;
			case 'farmer_add':
				return res.view('blank', {
					layout: 'adminFarmerAdd',
				})
				break;
			case 'order':
				return res.view('blank', {
					layout: 'adminOrder',
				})
				break;
			case 'order_detail':
				return res.view('blank', {
					layout: 'adminOrderDetail',
					orderID: req.session.orderID
				})
				break;
			case 'logout':
				req.session.isAdmin = false;
				return res.redirect('admin/login')
		}
	},

	adminLogin: function(req, res) {
		var password = req.param('password');
		if(password == 'werthebest') {
			req.session.isAdmin = true;
			return res.json({ result: 'ok' });
		}else{
			return res.json({ error: 'error' }, 400);
		}
	},
};

