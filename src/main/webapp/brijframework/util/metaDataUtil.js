webApp.factory('metaDataUtil', function (formettorUtil, $rootScope, $compile) {
	
	 var weatherIconHash = {
		        "Chance_of_Flurries": "wi-day-cloudy-gusts",
		        "Chance_of_Rain": "wi-rain",
		        "Chance_of_Freezing_Rain": "wi-rain-wind",
		        "Chance_of_Sleet": "wi-storm-showers",
		        "Chance_of_Snow": "wi-snow",
		        "Chance_of_Thunderstorms": "wi-thunderstorm",
		        "Chance_of_a_Thunderstorm": "wi-thunderstorm",
		        "Clear": "wi-day-sunny",
		        "Cloudy": "wi-cloudy",
		        "Flurries": "wi-day-cloudy-gusts",
		        "Fog": "wi-fog",
		        "Haze": "wi-day-fog",
		        "Mostly_Cloudy": "wi-day-cloudy",
		        "Mostly_Sunny": "wi-day-sunny-overcast",
		        "Partly_Cloudy": "wi-day-cloudy",
		        "Partly_Sunny": "wi-day-sunny-overcast",
		        "Freezing_Rain": "wi-rain-wind",
		        "Rain": "wi-rain",
		        "Sleet": "wi-storm-showers",
		        "Snow": "wi-snow",
		        "Sunny": "wi-day-sunny",
		        "Thunderstorms": "wi-thunderstorm",
		        "Thunderstorm": "wi-thunderstorm",
		        "Overcast": "wi-day-sunny-overcast",
		        "Rain_Showers": "wi-showers",
		        "Snow_Showers": "wi-snow",
		        "Scattered_Clouds": "wi-day-lightning",
		        "Light Rain": "wi-rain-mix",
		        "Light Freezing Rain": "wi-hail ",
		        "Light Snow": "wi-snow",
		        "Light Drizzle": "wi-rain-mix"
		    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

	 function getParantIDFromHash(menuHash, arrayObject, keyName, arrayName, parentKey) {
	        for (var i = 0; i < arrayObject.length; i++) {
	            if (arrayObject[i][keyName] !== 'undefined') {
	                var menuArray = [];
	                if (parentKey != undefined && menuHash[parentKey] != undefined) {
	                    angular.forEach(menuHash[parentKey], function (value) {
	                        menuArray.push(value);
	                    });
	                }
	                menuArray.push(arrayObject[i][keyName]);
	                menuHash[arrayObject[i][keyName]] = menuArray;
	                getParantIDFromHash(menuHash, arrayObject[i][arrayName], keyName, arrayName, arrayObject[i][keyName]);
	            }
	        }
	    };
	    
    function getMsgForId(id) {
        var msg = msgObjHash[id];
        if (msg !== undefined) {
            return formettorUtil.getCompileTextFromHashValue(msg);
        } else {
            return id;
        }

    }
	return {
		weatherIconHash						:				    weatherIconHash,
		getParantIDFromHash					:					getParantIDFromHash,
		toTitleCase							:					toTitleCase,
		getMsgForId							:                   getMsgForId
	}
});