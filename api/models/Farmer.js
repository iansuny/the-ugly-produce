/**
* Farmer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	name:{
		type:'string',
		required: true,
    },

    location:{
		type:'string',
		required: true,
    },

  	text:{
		type:'string',
		required: true,
  	},

  	pic:{

  	},

  }
};

