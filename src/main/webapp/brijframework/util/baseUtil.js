webApp.factory('baseUtil', function ($rootScope, $compile) {
   
    //compare to String
    function compare(v1, v2) {
        var t1 = typeof v1;
        var t2 = typeof v2;
        if (t1 == t2) {
            if (t1 == "string") {
                v1 = v1.toLowerCase();
                v2 = v2.toLowerCase();
            }
            if (v1 === v2) return 0;
            return v1 < v2 ? -1 : 1;
        } else {
            return t1 < t2 ? -1 : 1;
        }
    }
    
    // reverse Function is used to reverse the string or number
    function reverse(val) {
        var result = "";
        val = val || "";
        for (var i = 0; i < val.length; i++) {
            result = val.charAt(i) + result;
        }
        return result;
    }

    function isEmptyStr(text) {
        if (text == null || text == undefined || text.length == 0 || text == 'null') {
            return true;
        }
        return false;
    }


    function prependValues(objValue, prependValue, noOfTimes) {
        var tempStr = null;
        if (typeof objValue == 'number') {
            tempStr = "" + objValue;
        } else if (typeof objValue == 'string') {
            tempStr = objValue;
        } else {
            return objValue;
        }
        if (typeof noOfTimes == 'number') {
            for (var times = 0; times < noOfTimes; times++) {
                tempStr = prependValue + tempStr;
            }
            return tempStr;
        }
        return objValue;

    };

    function countOccurence(stringvalue, charvalue) {
        return stringvalue.match(new RegExp(charvalue, "g") || []).length;
    }

    function replaceDotToUnderscore(value) {
        if (value.indexOf(".") !== -1) {
            value = value.replaceAll(".", "_");
        }
        return value;
    };

    //is Integer
    function isInt(n) {
        return n % 1 === 0;
    }
    
    //checking UndefinedOrNull
	 function checkUndefinedOrNull(dataObject) {
	    return (dataObject === undefined || dataObject === null);
	  }
	 
	 // is not UndefinedOrNull
	 function notUndefinedOrNull(dataObject) {
	    return !checkUndefinedOrNull(dataObject);
	 }
	 

    return {
    	compare											:				compare,
    	reverse											:				reverse,
    	isEmptyStr										: 				isEmptyStr,
        replaceDotToUnderscore							:				replaceDotToUnderscore,
        isInt											:				isInt,
        prependValues									:			    prependValues,
        checkUndefinedOrNull							:				checkUndefinedOrNull,
        notUndefinedOrNull								:				notUndefinedOrNull
    };

});