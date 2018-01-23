angular.module('myModule').factory('stringService', function(){
	// because services are just objects (containing variables and methods), containing reusable code.
	// They help seperating the 
	// reusable parts of a code, and make it cleaner, improve readability and make it less complex.
	return {
		processString : function(input){
			if(!input){
				return input;
			}

			var output = '';

			for(var i=0; i<input.length; i++){
				if((i>0) && (input[i] != " ") && (input[i-1]!=" ") && (input[i]==input[i].toUpperCase())){
					output = output + " ";
				}
				output = output + input[i];
			}

			return output;
		}
	}
});