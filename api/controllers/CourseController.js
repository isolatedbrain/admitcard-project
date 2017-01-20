/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * This action will be used to give the user to create the course details. In this action first I am 
	 * getting all the university list and passing into the view. From where the user can select the university
	 * who will serve this course.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * 
	 */
	'new' : function(req, res,next) {
		University.find().exec(function foundUiversity(err, university) {
			if(err) return next(err);
			if(!university) return next();
			res.view({
				university : university
			});
		});
		//res.view();
	},


	/**
	 * This action will be used to create new course data. This action will get all the data from the 
	 * user and will insert data into the database.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * @param {mixed} next This will handle the errors and will give the error messages.
	 * 
	 */
	create : function(req,res,next){
		Course.create(req.params.all(), function courseCreated(err,course){
			if (err) return next(err);

			res.redirect('/course/show/' + course.id);
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
		Course.findOne(req.param('id'), function foundCourse(err, course) {
			if(err) return next(err);
			if(!course) return next();
			res.json(course);
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
	 * return the result in the json format containing the course data and related university data.
	 * @param  {mixed} req this will contain all the request data.
	 * @param  {mixed} res This is the response data that will be passed to the view or returned to the user.
	 * @param {mixed} next This will handle the error messages.
	 * @return {mixed} This will return the result data in the json format.
	 */

	search : function(req, res, next){
		var a = req.param('crs_name');		
		Course.find({name: {'contains' : a}}).populate('owner').exec(function (err, crsData){
			if(err){
				return res.serverError(err);
			}
			return res.json(crsData);
		});
	}
	
};

