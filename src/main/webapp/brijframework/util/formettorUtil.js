webApp.factory('formettorUtil', function (dateUtil,baseUtil,timeUtil, $rootScope, $compile){
	function format(value, IID, countryFormat) {
	        if (countryFormat == undefined)
	            countryFormat = '$';
	        if (IID == '$')
	            return coreformatter(value, countryFormat, 0, "");
	        else if (IID == 'N')
	            return coreFormatter(value, "", 0, "");
	        else if (IID == '$1D')
	            return coreFormatter(value, countryFormat, 1, "");
	        else if (IID == '$2D')
	            return coreFormatter(value, countryFormat, 2, "");
	        else if (IID == '$3D')
	            return coreFormatter(value, countryFormat, 3, "");
	        else if (IID == '1D')
	            return coreFormatter(value, "", 1, "");
	        else if (IID == '2D')
	            return coreFormatter(value, "", 2, "");
	        else if (IID == '3D')
	            return coreFormatter(value, "", 3, "");
	        else if (IID == '%')
	            return coreFormatter(value, "", 2, "%");
	    }

    function coreFormatter(val, prefix, decimalValStrength, suffix) {
        var originalVal = val;

        function responseObject(val, formatCall, noFormat, originalval) {
            coreNumberFormatResponse = new Object();
            coreNumberFormatResponse.value = val;
            coreNumberFormatResponse.oldvalue = originalval;
            coreNumberFormatResponse.formatcalling = formatCall;
            coreNumberFormatResponse.noformat = noFormat;
            return coreNumberFormatResponse;
        }

        var callingStatus = true;
        var noStatus = true; //if its true number is in right format else number is in wrong format
        if (prefix == undefined || isNaN(prefix) == false) {
            callingStatus = false;
            prefix = "";
        }
        if (suffix == undefined || isNaN(suffix) == false) {
            callingStatus = false;
            suffix = "";
        }
        if (decimalValStrength == undefined || decimalValStrength == "" || isNaN(decimalValStrength) == true) {
            callingStatus = false;
            decimalValStrength = 0;
        }

        if (val != undefined && isNaN(val) == false) {
            return responseObject(currencyRgxFormat(parseFloat(val), prefix, decimalValStrength) + "" + suffix, callingStatus, noStatus, val);
        } else {
            noStatus = false;
            return responseObject(val, callingStatus, noStatus, originalVal);
        }
    }
    
    // currencyFormatter function is used to format the number in currency format

    function currencyFormatter(val, currencyString) {
        val = baseUtil.reverse(val);
        var result = "";
        for (var i = 0; i < val.length; i++) {
            if (i % 3 == 0 && i != 0) {
                result += "," + val.charAt(i);
            }
            else {
                result += val.charAt(i);
            }
        }
        val = currencyString + " " + baseUtil.reverse(result);
        return val;
    }

    function currencyRgxFormat(n, currency, fixedDecimal) {
        var currencyVal = currency + " " + n.toFixed(fixedDecimal).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        currencyVal = currencyVal.replaceAll(" ", "");
        return currencyVal;
    };

    function toUSFormat(phn) {
        if (typeof phn === 'string' && phn.length >= 10) {
            return phn.substr(0, 3) + "-" + phn.substr(3, 3) + "-" + phn.substr(6);
        } else if (typeof phn === 'number') {
            var phnStr = "" + phn;
            if (phnStr.length >= 10) {
                return phnStr.substr(0, 3) + "-" + phnStr.substr(3, 3) + "-" + phnStr.substr(6);
            } else if (phnStr.length < 10) {
                var newVal = baseUtil.prependValues(phnStr, '0', (10 - phnStr.length));
                return newVal.substr(0, 3) + "-" + newVal.substr(3, 3) + "-" + newVal.substr(6);
            }
        } else {
            return phn;
        }
    };

    // Formatter change the value in currency format with
    // decimal implementation and return the object with old value and
    // new value and value is in right format or not or function calling is right or not with boolean
   

    //converting rgb value to hex value
    function rgbToHex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
    }
    
    
    /**
     * compile the haxa-value into text
     * ex. hashVal="&#26631;&#20934;&#29677;&#27425"
     */
    function getCompileTextFromHashValue(hashVal) {
        if (hashVal == undefined || hashVal == null) {
            return hashVal;
        }
        return ($($compile("<span>" + hashVal + "</span>")($rootScope)[0]).text());
    }

    function phoneFormat(mask, number) {
        if (number == undefined || number == null) {
            return number;
        }
        if (typeof number == 'number') {
            number = '' + (number);
        }
        var actualCount = baseUtil.countOccurence(mask, 'X');
        var s = '' + number, r = '';
        if (s.length >= actualCount) {
            for (var im = 0, is = 0; im < mask.length && is < s.length; im++) {
                r += mask.charAt(im) == 'X' ? s.charAt(is++) : mask.charAt(im);
            }
            r += s.substr(is);
            return r;
        }
        return s;
    }

    function convertNumber(number, format) {
        if (number != undefined) {
            var tail = format.lastIndexOf('.');
            number = number.toString();
            tail = tail > -1 ? format.substr(tail) : '';
            if (tail.length > 0) {
                if (tail.charAt(1) == '#') {
                    tail = number.substr(number.lastIndexOf('.'), tail.length);
                }
            }
            number = number.replace(/\..*|[^0-9]/g, '').split('');
            format = format.replace(/\..*/g, '').split('');
            for (var i = format.length - 1; i > -1; i--) {
                if (format[i] == '#') {
                    format[i] = number.pop()
                }
            }
            return number.join('') + format.join('') + tail;
        }
        return number;
    }
    
    return {
    	format						    :				format,
    	coreFormatter					:				coreFormatter,
    	currencyRgxFormat				: 				currencyRgxFormat,
    	currencyFormatter              	:				currencyFormatter,
    	phoneFormat					    :				phoneFormat,
    	toUSFormat					    :			    toUSFormat,
    	rgbToHex					    : 				rgbToHex,
    	getCompileTextFromHashValue    	:            	getCompileTextFromHashValue,
    	convertNumber					:               convertNumber
    }

});