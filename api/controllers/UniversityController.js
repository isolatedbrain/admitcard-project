/**
 * UniversityController
 *
 * @description :: Server-side logic for managing universities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * This action will be used to give the user to create the university details.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * 
	 */
	'new' : function(req, res) {
		res.view();
	},

	/**
	 * This action will be used to create new university data. This action will get all the data from the 
	 * user and will insert data into the database.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * @param {mixed} next This will handle the errors and will give the error messages.
	 * 
	 */

	create : function(req,res,next){
		University.create(req.params.all(), function universityCreated(err,university){
			if (err) return next(err);

			res.redirect('/university/show/' + university.id);
		});
	},

	/**
	 * This action will be used to show the latest entry created by the user.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * @param {mixed} next This will handle the errors and will give the error messages.
	 * 
	 */
	show : function(req, res, next){
		University.findOne(req.param('id'), function foundUniversity(err, university) {
			if(err) return next(err);
			if(!university) return next();
			res.view({
				university : university
			});
		});
	},

	/**
	 * This action will be give the search form to the user. User has to just enter the string into the text box
	 * and will pass the the request data to search action.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 */

	searchString : function(req, res){
		res.view();
	},

	/**
	 * This action will be give the data that matched with the string searched by the user. This action will
	 * return the result in the json format containing the university data and related course data.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * @param {mixed} next This will handle the error messages.
	 * @return {mixed} This will return the result data in the json format.
	 */

	search : function(req, res, next){
		var a = req.param('uni_name');
		sails.log.debug(req.method);
		University.find({uni_name: {'contains' : a}}).populate('courses').exec(function (err, uniData){
			if(err)
			{
				return res.serverError(err);
			}
			return res.json(uniData);
		});
	}
};

