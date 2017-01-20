/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		
  		name : {
  			type : 'string',
  			required : true
  		},

  		fees : {
  			type : 'float',
  			required : true
  		},

  		course_duration : {
  			type : 'string',
  			required : true
  		},

  		owner : {
  			model : 'university',
  			//required : true
  		}
  }
};

