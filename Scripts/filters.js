angular.module('myModule').filter("gender", function(){
	return function(gen){
		switch(gen){
			case "1":
				return "Male";
			case "2":
				return "Female";
			case "3":
				return "Not disclosed";
		}
	}
})
// Tutorial 13: Creating custom filter.
// why we are creating an extra anonymous function is because in Angular, 
// the first anonymous function is used for dependency injection. it lets you define 
// dependency on per-filter basis.
// the Angular docs it says that .filter function and others like it 
// should get providers not values. The second reason is
// we can use for parameter injection. Also the concept of lazy evaluation
// which is call by need and not call by value. So, the second parameter which
// is called will only be evalutated if its needed.