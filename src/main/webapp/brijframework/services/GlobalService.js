/**
 Returns the merge Hash .
 */

/*Object.prototype.mergeHash = function(obj2){
 var obj3 = {};
 for (var attrname in this) { obj3[attrname] = this[attrname]; }
 for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
 return obj3;
 };*/


/*Returns the character before the specified string.*/

/*Array.prototype.getHashFromArrayOfObjects = function (keyName) {
 var hash = {};
 for (var i = 0; i < this.length; i++) {
 if (this[i][keyName] !== 'undefined') {
 hash[this[i][keyName]] = this[i];
 }
 }
 return hash;
 };*/

/**/

/*Array.prototype.contains = function (value) {
 var i;
 for (i = 0; i < this.length; i++) {

 if (this[i] === value) {

 return true;
 }
 }
 return false;
 };*/

/**/


String.prototype.startsWith = function (str) {
  return this.indexOf(str) == 0;
};

String.prototype.getFirstChar = function () {
  return this[0];
};

/**/


String.prototype.removeSpaces = function () {
  return this.replace(/\s+/g, '');
};

/**/
/*Array.prototype.insertAt = function (index, item) {
 this.splice(index, 0, item);
 };
 */
String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/*Returns the character before the specified string.*/

String.prototype.codePointBefore = function (string) {
  return this.substr(0, this.indexOf(string));
};

String.prototype.insertCharAt = function (index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};

/*returns the date in string form according to format specified*/
Date.prototype.formatter = function (formatterString, langId) {
  return DateFormatter.format(this, formatterString, langId);
};

Date.prototype.getCurrentDate = function () {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

Date.prototype.offsetMntsToBusiDate = function (minutes) {
  var date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
  date.setMinutes(minutes);
  return date;
};

Date.prototype.timeForZoneOffset = function (offset) {
  utc = this.getTime() + (this.getTimezoneOffset() * 60000);
  newDate = new Date(utc + (3600000 * offset));
  return newDate;
}

Date.prototype.getMinutesOfDay = function(){
    return (this.getHours() * 60) + this.getMinutes();
}

String.prototype.replaceAll = function (str1, str2, ignore) {
  return  this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

Date.prototype.dateOffset = function(offset) {
	this.setDate(this.getDate() + offset);
	return this;
}

Date.prototype.getNextPrevDates = function(numOfDays){
    var nextDate = this;
    if(numOfDays === undefined || numOfDays === 0)
        return nextDate;
    return new Date(nextDate.setDate(nextDate.getDate() + numOfDays));
}
/**********ES6 Functions***************/
String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
};
String.prototype.contains = function(str, startIndex) {
    return ''.indexOf.call(this, str, startIndex) !== -1;
};

Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
        'use strict';
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
                continue;
            }
            nextSource = Object(nextSource);

            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
});
var images = [];
function preload() {
	try{
	    for (i = 0; i < arguments.length; i++) {
	        images[i] = new Image();
	        images[i].src = preload.arguments[i];
	    }
	}catch(e){}
}
function preloadImages(){
	preload(
		    "assets/images/wizard/bg-schwiz.png",
		    "assets/images/wizard/bg-clkwiz.png",
		    "assets/images/wizard/bg-chklistwiz.png",
		    "assets/alta/icons/wizClock-2.png",
		    "assets/alta/icons/wizClock-3.png",
		    "assets/alta/icons/wizClock-13.png",
			"assets/alta/icons/laptop.png"
	)
}

/**********JQuery Functions***************/

$.fn.removeClassWithRegex = function(regex) {
	  return $(this).removeClass(function(index, classes) {
	    return classes.split(/\s+/).filter(function(c) {
	      return regex.test(c);
	    }).join(' ');
	  });
};

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}


if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		'use strict';
		if (typeof start !== 'number') {
			start = 0;
		}

		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		}
	};
}
if (!String.prototype.contains){
	String.prototype.contains = function(str, startIndex) {
		return ''.indexOf.call(this, str, startIndex) !== -1;
	};
}
if (!Element.prototype.matches) {
    	Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector ||
        function(s) {
    		var matches = (this.document || this.ownerDocument).querySelectorAll(s),i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

    Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this|
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len)
        //    where Array is the standard built-in constructor with that name and
        //    len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                //    method of O with argument Pk.
                kValue = O[k];

                // ii. Let mappedValue be the result of calling the Call internal
                //     method of callback with T as the this value and argument
                //     list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true },
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // For best browser support, use the following:
                A[k] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
    
}
