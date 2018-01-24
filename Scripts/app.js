/*
This is app.js file is the module which wires together all the parts of our angular JS,
to make the functionality of our app portable.  Also, It tells Angular how our app
has to be bootstrapped.
Hence this file will contain the code of all the controllers, services etc.

There is no single starting point in Angular JS. There are three things which run hand in hand
ie side by side:

The first is the "model", which is a synonym for "data". All the data of our app is present inside
model. All the data that is coming from the backend API can also be included inside this model 
any data (functions and variables) that we are defining inside our javascript (controller) can also be
included inside this model. This model is the only thing that we can use inside our HTML file
using data bindings, and nothing else, because Angular understands this way only. It deosnt get
anything else.
Now how to make this data a model for angular to understand and hence
be able to access this model inside the html file using data binding? 
Through $scope object. $scope object is an object which angular automatically passes as a
parameter behind the scenes, inside the 
javascript controller function made by us, as soon as it encouters this controller function.
Now in order to catch
this object and use it, we need to include a $scope object as a parameter in our controller
function. and so, any variable that we will make in this $scope object, it will be counted
as a model, and hence will become angular understandeable. Therefore, after defining any variable
or getting the data from the API, we always pass it into the scope object.
This is the entire functionality of model.

The second is "view". this is our html file. Index.html file will display everything.
Anything that is kept for angular will be evaluated by
angular. hence html file acts as the view of our app. it is responsible for displaying all 
the functionality 
that we have coded in our controller in the way we want, by forming the htnl file. this html file
can access any data inside the model, using one way or 2 way data binding.

The third is "Controller"
This is just a javascript function or more precisely a JS constructor (used to initialise varibles)
which we code ourselves, and define initialise varibles, and put them in our model using scope object
so that we can access those varibles in our view. Hence this acts as a connector betweeb the model
and the view.

this is the complete MVC (Model View Controller) architechture of AngularJS. this is how it works as a 
whole. No single starting point.
*/

var app = angular
	.module("myModule", ["ngRoute", "ngMaterial"])
	.run(function(){
		console.log("bootstrapped!");
	})
	.config(function($routeProvider, $locationProvider){
		$routeProvider.caseInsensitiveMatch = true; // this is to make all route urls
													// case insensitive (caps or small).
													// we can specify this property individually
													// also inside every when() object.
		$routeProvider
			.when("AngularJS-tutorials/introduction", {
				templateUrl: "Templates/introduction.html",
				controller: "introduction"
			})
			.when("AngularJS-tutorials/sortRowsByHeader", {
				templateUrl: "Templates/sortRowsByHeader.html", // we can also use inline templates
																// instead of separate html files.
																// In that case, the property name will be
																// simply "template" and not "templateUrl".
																// for example:
																// template: "<h1>Inline templates</h1>"  
				controller: "sortRowsByHeaderController"
			})
			.when("AngularJS-tutorials/searchFilterByMultipleProperties", {
				templateUrl: "Templates/searchFilterByMultipleProperties.html",
				controller: "searchFilterByMultiplePropertiesController"
			})
			.when("AngularJS-tutorials/customFiltersNghideNgshow", {
				templateUrl: "Templates/customFiltersNghideNgshow.html",
				controller: "customFiltersNghideNgshowController"
			})
			.when("AngularJS-tutorials/httpAndLogService", {
				templateUrl: "Templates/httpAndLogService.html",
				controller: "httpAndLogServiceController"
			})
			.when("AngularJS-tutorials/httpAndLogService/:id", {
				templateUrl: "Templates/httpAndLogServiceDetails.html",
				controller: "httpAndLogServiceDetailsController"
			})
			.when("AngularJS-tutorials/customService", {
				templateUrl: "Templates/customService.html",
				controller: "customServiceController"
			})
			.when("AngularJS-tutorials/anchorScrollAndLocation", {
				templateUrl: "Templates/anchorScrollAndLocation.html",
				controller: "anchorScrollAndLocationController"
			})
			.when("AngularJS-tutorials/controllerAs", {
				templateUrl: "Templates/controllerAs.html",
				controller: "controllerAsController",
				controllerAs: "controllerAsCtrl"
			})
			.otherwise({
				redirectTo: 'AngularJS-tutorials/introduction' 
			});
		// $locationProvider.html5Mode(true); // to remove he hash and the ! symbol from the 
										   // url and make them cleaner.
		 // $locationProvider.hashPrefix('');

	})
	.controller("introduction", function($scope){
		$scope.helloMessage = "Hello World";
		Prism.highlightAll();
	})
	.controller("sortRowsByHeaderController", function($scope){
		// Video 10: To sort rows of a table by table headers 

		var workers = [
			{name: "Yoshita", dateOfBirth: new Date("September 2, 1995"), gender: "female", salary: "25000"},
			{name: "Dhawal", dateOfBirth: new Date("October 21, 1993"), gender: "male", salary: "70000"},
			{name: "Pushpa", dateOfBirth: new Date("August 6, 1962"), gender: "female", salary: "100000"},
			{name: "Dilpreet", dateOfBirth: new Date("August 20, 1996"), gender: "male", salary: "25000"},
		];

		$scope.workers = workers;
		$scope.sortColumn = "name";
		$scope.reverseSort = false;
		//alert($scope.reverseSort);

		$scope.sortData = function(column){
			$scope.reverseSort = ($scope.sortColumn == column)? !$scope.reverseSort : false;
			$scope.sortColumn = column;
		}

		$scope.getSortClass = function(column){
			if ($scope.sortColumn == column) {
				return ($scope.reverseSort) ? 'arrow-down' : 'arrow-up';
			}
			
			return " ";
			
		}
		Prism.highlightAll();
	})
	.controller("searchFilterByMultiplePropertiesController", function($scope){
		//Video 11 and 12: Search filter by multiple properties

		var persons = [
			{name: "Yoshi", gender:"female", salary:"25000", city:"New Delhi"},
			{name: "Dhawal", gender:"male", salary:"70000", city:"Mumbai"},
			{name: "Pushpa", gender:"female", salary:"100000", city:"Chennai"},
			{name: "Dilpreet", gender:"male", salary:"25000", city:"Bangalore"},
			{name: "Rajdeep", gender:"male", salary:"30000", city:"Kolkata"},
		]

		$scope.persons = persons;

		$scope.search = function(item){

			if($scope.searchLine == undefined){
				return true;
			}
			else{
				if(item.name.toLowerCase().indexOf($scope.searchLine.toLowerCase())!=-1||item.city.toLowerCase().indexOf($scope.searchLine.toLowerCase())!=-1){
					return true;
				}	
			}
			return false;
		}
		Prism.highlightAll();
	})
	.controller("customFiltersNghideNgshowController", function($scope){
		// tutorial 13, 14: custom filters and ng-hide and ng-show 

			var employees = [
				{name: "Yoshita", gender: "1", salary: "25000"},
				{name: "Dhawal", gender: "2", salary: "50000"},
				{name: "Pushpa", gender: "1", salary: "75000"},
				{name: "Dilpreet", gender: "2", salary: "100000"},
				{name: "Rajdeep", gender: "3", salary: "125000"},
			]

			$scope.employees = employees;
			Prism.highlightAll();
	})
	.controller("httpAndLogServiceController", function($scope, $log, $http, $route){
		// tutorial 17, 18 on $http and $log service:

		$scope.query = 'harry';

		/*

			this function below runs and the get method inside it runs asynchronously.
			and the get function returns a promise object.
			hence we cant assign the retured value to our own variable like this:
			$scope.employees = $http.get('...');

			also, the $watch function is angular's inbuilt function to 
			keep a watch on the value of any scope object. as soon as it changes,
			it makes a function call. so, here it has been used with  the query 
			string object attached with the ng-model in the view. therefore,
			it will make a function call whenever the text will be changed. :D 

			then() funciton is calle dthe success callback function. It is called
			only when the request is completed successfully. When the request is completed
			successfully, the response object is returned. this response object contains 
			many properties. one of whose properties is "data" object. this data is the data which
			contains all the info that we want. further distribution can be looked
			by seeing the structure of the response object, which can be seen with the help of 
			"$log" service which would log the entire response object into the console in the browser, :D 
		*/

		$scope.$watch('query', function(){
			$http({
				url: "https://www.googleapis.com/books/v1/volumes?q=" + $scope.query,
				method: "get"
			})
			.then(function(response){
				$scope.books = response.data.items;
				// $log.info(response);
			}, function(reason){
			 	$scope.error = reason.data;
			 	$log.info(reason);
			});
		});

		$scope.reloadData = function(){
			$route.reload();
		}
		Prism.highlightAll();
	})
	.controller("httpAndLogServiceDetailsController", function($scope, $http, $routeParams, $route, $log){
		$http({
			url: "https://www.googleapis.com/books/v1/volumes?q=" + $routeParams.id,
			method: "get"
		})
		.then(function(response){
			$scope.bookData = response.data.items[0];
			$log.info(response);
		})
		Prism.highlightAll();
	})
	.controller("customServiceController", function($scope, stringService){
		// video 20

		$scope.transformString = function(input){
			$scope.output = stringService.processString(input);
		}
		Prism.highlightAll();
	})
	.controller("anchorScrollAndLocationController", function($scope, $location, $anchorScroll){

			// video 21 and 22. 22 is slightly different, but the concept is same as 21. below is
			// the code only for 21. so watch 22 while revising :)

			$scope.scrollTo = function(scrollLocation){
				$location.hash(scrollLocation); //hash function will take the value in scrollLocation and
												// will append it to the url with a hash (#)
				$anchorScroll.yOffset = 20; //this is used to set top padding (from the browser window)
											//to the anchorScrolled element.
				$anchorScroll(); // this will read the appended hashed value and scroll to the element
								 // of the page which has that as its id.
			}
		Prism.highlightAll();
	})
	.controller("controllerAsController", function($scope, $rootScope, $log){
		
		var msg = "Hello World!";
		this.message = msg;
		

		/*
			$scope.$on("$routeChangeStart", function(event, next, current){ 

				// this is to prevent from accidentally
				// changeing the route.
				// $routeChangeStart is the property
				// which is changed when a route is
				// changed and then an anonymous 
				// function is called which takes
				// the event, the next route, and the 
				// current route parameters.
				
				// Also, instead of using the $routeChangeStart, we can also use $locationChangeStart.
				// the only difference will be that $locationChangeStart will store the complete url name.
				// and also we wont have to use $$route.originalPath objects as done below.
				// we'll simple include $locationChangeStart instead of $routeChangeStart above
				// and in the confirm methos below, we'll do confirm("message" + next + "?");

				if(!confirm("Are you sure you wanna leave to " + next.$$route.originalPath + "?")){
															// this next.$$route.originnalPath 
															// is used to tell whereTo we are leaving
															// ie, it will display the route to which 
															// we are navigating to. this is because
															// the "next" object stores the next url's value
															// which we just clicked.  
					event.preventDefault();
				});

		*/
			
			$scope.$on("$routeChangeStart", function(event, next, current){
				$log.debug("$routeChangeStart fired");
				$log.debug(event);
				$log.debug(next);
				$log.debug(current);
			});

			$scope.$on("$locationChangeStart", function(event, next, current){
				$log.debug("$locationChangeStart fired");
				$log.debug(event);
				$log.debug(next);
				$log.debug(current);
			});

			// $rootScope.$on("$locationChangeSuccess", function(event, next, current){
			// 	$log.debug("$locationChangeSuccess fired");
			// });

			// $rootScope.$on("$routeChangeSuccess", function(event, next, current){
			// 	$log.debug("$routeChangeSuccess fired");
			// });
			Prism.highlightAll();
	});

	/*
	watch video 40. its same as $http Service. 
	make a function for the current route (search vala).
	It takes the typed name through two way data binding 
	and then redirects the user to a different route
	using the $locarion.url(<here comes the route name typed by the user>)
	eg: $location.url("/studentSearch" + $scope.name);
	There will be a new controller for the new route to fetch data from the web service.
	for more watch the full video.
	*/

	/*

	video 41: Its about the resolve property of the when() method of routes.

	resolve: {
		books: function($http){
		
		}
	}

	*/