webApp.factory('timeUtil', ['$interval', function ($interval) {

    var strTimeZone = 5.5;
    var timezoneName = "IST";
    var currentTime;
    var clockTimeInMillis;
    var intervalID;
    // schedule update in one second
    function updateClock() {
        intervalID = $interval(function () {
            clockTimeInMillis = clockTimeInMillis + 1000;
            currentTime.setTime(clockTimeInMillis);
        }, 1000)
    }

    function startClock(timeFrmServer) {
        if (intervalID != null) {
            $interval.cancel(intervalID);
        }
        clockTimeInMillis = timeFrmServer;
        currentTime = new Date(clockTimeInMillis);
        updateClock();// setInterval(updateClock(),1000);
    }

    function timeZoneDateTime(offset) {
        d = currentTime;
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        nd = new Date(utc + (3600000 * (offset / 60)));
        return nd;
    };

    function setStrTimeZone(strTz) {
        strTimeZone = strTz;
    }

    function getStrTimeZone(val) {
        return strTimeZone;
    }

    function setTimeZoneName(strName) {
        timezoneName = strName;
    }

    function getTimeZoneName() {
        return timezoneName;
    }

    function getCurrentTime() {
        return timeZoneDateTime(strTimeZone);
    };

    function getCurrentDate() {
        return getCurrentTime().getCurrentDate();
    }


    function formatTime(time) {
        var totalHours = Math.floor(time / 60);
        var hours = totalHours;
        var ampm = (hours < 12 ? 'a' : 'p');
        if (hours > 12) {
            hours -= 12;
        }
        if (hours == 0) {
            hours = 12;
        }
        var minutes = time % 60;
        if (minutes < 10) {
            minutes = ':0' + minutes;
        } else {
            minutes = ':' + minutes;
        }

        if (Math.floor(time / 60) > 12 && (Math.floor(time / 60) - 12) === 12 && ampm == "p") {
            return hours + minutes + "a " + (totalHours >= 24 ? "+1 Day" : "");
        } else {
            if (totalHours >= 24) {
                hours = hours - 12;
                ampm = (hours < 12 ? 'a' : 'p');
            }
            return (hours + minutes + ampm + (totalHours >= 24 ? " +1 Day" : ""));
        }
    }

    function minsBetweenTime(date1, date2) {
        return Math.ceil((date1.getTime() - date2.getTime()) / 60000.0);
    }

    function minsDifference(date1, date2) {
        tempDate1 = new Date(date1.getYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes(), 0, 0);
        tempDate2 = new Date(date2.getYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), 0, 0);
        return Math.round((tempDate1 - tempDate2) / 60000);
    }

    function getDurationFromMins(mins) {
        if (typeof mins !== 'undefined' && mins !== null) {
            hours = new String(Math.floor(mins / 60));
            remMins = new String(Math.floor(mins % 60));
            return hours + ":" + (remMins.length < 2 ? "0" + remMins : remMins);
        }
    };

    function durationFromDifference(date1, date2) {
        return getDurationFromMins(Math.abs(minsBetweenTime(date1, date2)));
    }

    function getTimeStrFromDateDiff(date1, date2) {
        return getDurationFromMins(minsDifference(date1, date2));
    }

    function getTimeStrFromMinute(ttlMinutes) {
        ttlMinutes = ttlMinutes >= 1440 ? ttlMinutes - 1440 : ttlMinutes;
        var hours = Math.floor(ttlMinutes / 60);
        var minutes = ttlMinutes % 60;
        var meridian = hours >= 12 ? "p" : "a";
        hours = (hours > 12) ? (hours - 12) : (hours == 0 ? 12 : hours);
        var minString = (minutes < 10 ? ":0" : ":") + minutes;
        return hours + minString + meridian;
    }

    
    return {
    	formatTime							:        formatTime,
    	timeZoneDateTime					:		 timeZoneDateTime,
        startClock							:		 startClock,
        setStrTimeZone						:		 setStrTimeZone,
        getStrTimeZone						:		 getStrTimeZone,
        getCurrentTime						:		 getCurrentTime,
        getTimeZoneName						:		 getTimeZoneName,
        setTimeZoneName						:		 setTimeZoneName,
        getCurrentDate						:		 getCurrentDate,
        minsBetweenTime						:		 minsBetweenTime,
        getDurationFromMins					:		 getDurationFromMins,
        durationFromDifference				:		 durationFromDifference,
        getTimeStrFromDateDiff				:		 getTimeStrFromDateDiff,
        getTimeStrFromMinute				:		 getTimeStrFromMinute
    }
}]);