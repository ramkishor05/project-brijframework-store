webApp.factory('dateUtil', function (dateFilter) {
    // getDateObject corresponding to string
    // 2014-02-30
    var dayArray = [
        {
            index: 0,
            longTitle: "SUNDAY",
            smallTitle: "SUN"
        },
        {
            index: 1,
            longTitle: "MONDAY",
            smallTitle: "MON"
        },
        {
            index: 2,
            longTitle: "TUESDAY",
            smallTitle: "TUE"
        },
        {
            index: 3,
            longTitle: "WEDNESDAY",
            smallTitle: "WED"
        },
        {
            index: 4,
            longTitle: "THRUSDAY",
            smallTitle: "THU"
        },
        {
            index: 5,
            longTitle: "FRIDAY",
            smallTitle: "FRI"
        },
        {
            index: 6,
            longTitle: "SATURDAY",
            smallTitle: "SAT"
        }
    ];
    
    function getCurrentDate() {
        return Date.currentDate();
    }



    function isLeapYear(date) {
        var yr = new Date(date).getFullYear();
        if (yr % 400 == 0 || (yr % 100 != 0 && yr % 4 == 0)) {
            return true;
        }
        return false;
    }

    
    
    function getDateTimeObjectYYYYMMDD(stringDate,spliter) {
    	stringDate = (stringDate.indexOf("+") != -1) ? stringDate.substring(0,stringDate.indexOf("+")) : stringDate;
        if (stringDate == undefined)
            return null;
        var dateValue = null;
        var dataArray = (stringDate.indexOf("T") != -1) ? stringDate.split("T") : stringDate.split(" ");
        var dateObject = spliter!=undefined ? dataArray[0].split(spliter) : dataArray[0].split("/");
        var timeObject = dataArray[1].split(":");
        try {
            dateValue = new Date();
            dateValue.setFullYear(parseInt(dateObject[0]));
            dateValue.setMonth(parseInt(dateObject[1]) - 1, parseInt(dateObject[2]));
            dateValue.setHours(parseInt(timeObject[0]));
            dateValue.setMinutes(parseInt(timeObject[1]));
        } catch (err) {
            dateValue = null;
        }
        return dateValue;
    };


    function dateYYYYMMDD(dateStr, separator) {
        if (dateStr && separator) {
            var validReg = new RegExp('^(\\d{2,4})(' + separator + ')(\\d{1,2})(' + separator + ')(\\d{1,2})$');
            if (validReg.test(dateStr) &&
                dateStr.split(separator).length === 3) {
                try {
                    var dateArr = dateStr.split(separator);
                    var month = dateArr[1];
                    var day = dateArr[2];
                    var year = dateArr[0];
                    return (new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
                } catch (err) {
                    return (new Date());
                }
            } else {
                return (new Date());
            }
        } else {
            return (new Date());
        }

    }

    // 02/30/2014
    function dateMMDDYYYY(dateStr, separator) {
        var dateArr = dateStr.split(separator);
        var month = dateArr[0];
        var day = dateArr[1];
        var year = dateArr[2];
        return (new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
    }
    // 30/02/2014
    function dateDDMMYYYY(dateStr, separator) {
        var dateArr = dateStr.split(separator);
        var month = dateArr[1];
        var day = dateArr[0];
        var year = dateArr[2];
        return (new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
    }
    
    // 30/02/2014
    function getDateObject(dateValue) {
        var dateArray = dateValue.split("/");
        return new Date(parseInt(dateArray[2]), (parseInt(dateArray[0]) - 1), parseInt(dateArray[1]));
    };

    function getFirstDay(dateObj) {
        return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    }

    function getLastDay(dateObj) {
        return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
    }

    function sameDay(d1, d2) {
        return d1.getFullYear() == d2.getFullYear() &&
            d1.getMonth() == d2.getMonth() &&
            d1.getDate() == d2.getDate();
    }


    function getDateTimeObject(stringDate, spliter) {
        if (stringDate == undefined)
            return null;
        var dateValue = null;
        var dataArray = stringDate.split(" ");
        var dateObject = spliter != undefined ? dataArray[0].split(spliter) : dataArray[0].split("/");
        var timeObject = dataArray[1].split(":");
        try {
            dateValue = new Date();
            dateValue.setMonth(parseInt(dateObject[0]) - 1, parseInt(dateObject[1]));
            dateValue.setFullYear(parseInt(dateObject[2]));
            dateValue.setHours(parseInt(timeObject[0]));
            dateValue.setMinutes(parseInt(timeObject[1]));
        } catch (err) {
            dateValue = null;
        }
        return dateValue;
    };

    function getDateFormat(dateValue, pattern, langId) {
        var busiDate = getDateObject(dateValue);
        return busiDate.formatter(pattern, langId);
    };
    
    function getDateTimeWith12HrsFormat(date) {
        return (new Date(date).formatter('RIB_DT'));
    }

    Date.prototype.getFormattedTime = function () {
        return this.formatter("RIB");
    };
    function dateDiff(prevDate, nextDate, prevIsDefault) {
        var diff = nextDate - prevDate;
        return isNaN(diff) ? NaN : {
            diff: diff,
            milsec: Math.floor(diff % 1000),
            sec: Math.floor(diff / 1000 % 60),
            min: Math.floor(diff / 60000 % 60),
            hour: Math.floor(diff / 3600000 % 24),
            days: Math.floor(diff / 86400000),
            weeks: Math.floor(diff / 604800000),
            diffHour: Math.floor(diff / 3600000),
            diffMin: Math.floor(diff / 60000),
            diffSec: Math.floor(diff / 1000),
            diffHourMin: Math.floor(diff / 3600000) + ":" + Math.floor(diff / 60000 % 60),
            diffHourMin: (Math.floor(diff / 60000) / 60).toFixed(2),
            year: nextDate.getFullYear() - prevDate.getFullYear(),
            month: (nextDate.getFullYear() - prevDate.getFullYear()) * 12 + (nextDate.getMonth() - prevDate.getMonth()),
            prevDateFormatTime: prevDate.getFormattedTime(),
            nextDateFormatTime: nextDate.getFormattedTime(),
            mergedPrevNextFormatTime: prevDate.getFormattedTime() + "" + (!prevIsDefault ? ("-" + nextDate.getFormattedTime()) : ""),
            prevDateStr: prevDate.toString(),
            nextDateStr: nextDate.toString(),
            prevDateString: ("0" + (prevDate.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + prevDate.getDate().toString()).substr(-2) + "/" + prevDate.getFullYear(),
            nextDateString: ("0" + (nextDate.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + nextDate.getDate().toString()).substr(-2) + "/" + nextDate.getFullYear(),
            prevDateStr: ("0" + (prevDate.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + prevDate.getDate().toString()).substr(-2) + "/" + prevDate.getFullYear() + " " + ("0" + prevDate.getHours().toString()).substr(-2) + ":" + ("0" + prevDate.getMinutes().toString()).substr(-2),
            nextDateStr: ("0" + (nextDate.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + nextDate.getDate().toString()).substr(-2) + "/" + nextDate.getFullYear() + " " + ("0" + nextDate.getHours().toString()).substr(-2) + ":" + ("0" + nextDate.getMinutes().toString()).substr(-2)
        };
    }

    function getDateDiffObj(prevDate, nextDate) {
        var prevIsDefault = false;
        if (nextDate == null || nextDate === undefined || nextDate == "Invalid Date") {
            nextDate = (new Date());
            prevIsDefault = true;
        }
        return dateDiff(prevDate, nextDate, prevIsDefault);
    }

    
   
    function dateStringMMDDYYYY(date, withLeadingZero) {
        withLeadingZero = withLeadingZero !== undefined && withLeadingZero !== null ? withLeadingZero : false;
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (withLeadingZero) {
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
        }
        return (m + "/" + d + "/" + date.getFullYear());
    };


    function getDateDifferenceInDay(date1, date2) {
        var dateObj1 = new Date(date1).getCurrentDate();
        var dateObj2 = new Date(date2).getCurrentDate();
        var noOfDays = Math.round((dateObj2 - dateObj1) / 86400000);
        return noOfDays
    }

    function getWeekDiff(startIndex, startDate, endDate) {
        var week1 = getDateObjOnIndex(startIndex, startDate, true, false);
        var week2 = getDateObjOnIndex(startIndex, endDate, true, false);
        var noOfWeek = (parseInt(week2.getWeek()) - parseInt(week1.getWeek()) + 1);
        return noOfWeek;
    };
    


    function getWeekArray(index, startDate, noOfWeek) {
        var weekArray = [];
        var week = getDateObjOnIndex(index, new Date(), true, false);
        for (var i = 0; i < noOfWeek; i++) {
            if (!dateUtil.sameDay(week, startDate)) {
                weekArray.push({
                    'startDate': new Date(startDate),
                    'endDate': new Date(startDate.setDate(startDate.getDate() + 6))
                });
                startDate.setDate(startDate.getDate() + 1)
            }
        }
        return weekArray;
    };

    function weekHash(weekDayIndex, date) {
        if (weekDayIndex !== undefined && weekDayIndex < 7 && weekDayIndex >= 0) {
            var weekArray = [], objectHash = {}, dateObjArray = getDateObjOnIndex(weekDayIndex, date, false, false);
            var count = 0;
            for (var i = 0; i < 7; i++) {
                var dayHash = {};
                dayHash["day"] = dateObjArray[i].formatter("l");
                dayHash["dateObj"] = dateObjArray[i];
                dayHash["index"] = dateObjArray[i].getDay();
                dayHash['formattedDateObj'] = dayHash["dateObj"].formatter("m/d/Y");
                weekArray.push(dayHash);
                if (dateObjArray[i].getTime() < timeUtil.getCurrentDate().getTime()) {
                    count++;
                }
            }
            objectHash["count"] = count;
            objectHash["weekArray"] = weekArray;
            objectHash["dateObj"] = getDateObjOnIndex(weekDayIndex, date, true, false);
            return objectHash;
        }
    }

    function getDateObjOnIndex(index, dateOb, isFirstDay, isLastDay) {
        var dateObjArray = [];
        var date = 0, dateObj = new Date(dateOb);
        if (index > dateObj.getDay()) {
            date = (dateObj.getDate() + index - dateObj.getDay()) - 7;
        } else {
            date = dateObj.getDate() + (index - dateObj.getDay());
        }
        if (isFirstDay) {
            var dateObject = new Date(dateOb);
            dateObject.setDate(date);
            return dateObject;
        } else if (isLastDay) {
            var dateObject = new Date(dateOb);
            dateObject.setDate(date + 6);
            return dateObject;
        }
        for (var i = 0; i < 7; i++) {
            var dateObject = new Date(dateOb);
            dateObject.setDate(date);
            dateObjArray.push(dateObject);
            date++;
        }
        return dateObjArray;
    }
    
    var dayColObjectArray = [
                             {
                                 "hoursIndex": 1,
                                 "name": "12A"
                             },
                             {
                                 "hoursIndex": 2,
                                 "name": "1A"
                             },
                             {
                                 "hoursIndex": 3,
                                 "name": "2A"
                             },
                             {
                                 "hoursIndex": 4,
                                 "name": "3A"
                             },
                             {
                                 "hoursIndex": 5,
                                 "name": "4A"
                             },
                             {
                                 "hoursIndex": 6,
                                 "name": "5A"
                             },
                             {
                                 "hoursIndex": 7,
                                 "name": "6A"
                             },
                             {
                                 "hoursIndex": 8,
                                 "name": "7A"
                             },
                             {
                                 "hoursIndex": 9,
                                 "name": "8A"
                             },
                             {
                                 "hoursIndex": 10,
                                 "name": "9A"
                             },
                             {
                                 "hoursIndex": 11,
                                 "name": "10A"
                             },
                             {
                                 "hoursIndex": 12,
                                 "name": "11A"
                             },
                             {
                                 "hoursIndex": 13,
                                 "name": "12P"
                             },
                             {
                                 "hoursIndex": 14,
                                 "name": "1P"
                             },
                             {
                                 "hoursIndex": 15,
                                 "name": "2P"
                             },
                             {
                                 "hoursIndex": 16,
                                 "name": "3P"
                             },
                             {
                                 "hoursIndex": 17,
                                 "name": "4P"
                             },
                             {
                                 "hoursIndex": 18,
                                 "name": "5P"
                             },
                             {
                                 "hoursIndex": 19,
                                 "name": "6P"
                             },
                             {
                                 "hoursIndex": 20,
                                 "name": "7P"
                             },
                             {
                                 "hoursIndex": 21,
                                 "name": "8P"
                             },
                             {
                                 "hoursIndex": 22,
                                 "name": "9P"
                             },
                             {
                                 "hoursIndex": 23,
                                 "name": "10P"
                             },
                             {
                                 "hoursIndex": 24,
                                 "name": "11P"
                             }
                         ];
    var paidHourArray = [
                         {
                             "displayText": "00:00",
                             "mins": 0
                         },
                         {
                             "displayText": "00:15",
                             "mins": 15
                         },
                         {
                             "displayText": "00:30",
                             "mins": 30
                         },
                         {
                             "displayText": "00:45",
                             "mins": 45
                         },
                         {
                             "displayText": "01:00",
                             "mins": 60
                         },
                         {
                             "displayText": "01:15",
                             "mins": 75
                         },
                         {
                             "displayText": "01:30",
                             "mins": 90
                         },
                         {
                             "displayText": "01:45",
                             "mins": 105
                         }
                     ];


    return {
    	getLastDay							:		    getLastDay,
        getFirstDay							:		    getFirstDay,
        getDateDifferenceInDay				:		    getDateDifferenceInDay,
        isLeapYear							:		    isLeapYear,
        dateDiff							: 			dateDiff,
        getDateTimeWith12HrsFormat			:		    getDateTimeWith12HrsFormat,
        getDateDiffObj						:		    getDateDiffObj,
        getDateFormat						:		    getDateFormat,
        sameDay								:		    sameDay,
        getDateObject						:           getDateObject,
        dateDDMMYYYY						:           dateDDMMYYYY,
        dateYYYYMMDD						:           dateYYYYMMDD,
        dateMMDDYYYY						:           dateMMDDYYYY,
        dateStringMMDDYYYY					:		    dateStringMMDDYYYY,
        dayArray							:           dayArray,
        getDateTimeObject					:		    getDateTimeObject,
        getDateTimeObjectYYYYMMDD 			:		    getDateTimeObjectYYYYMMDD,
        getWeekDiff							:			getWeekDiff,
        getWeekArray						: 			getWeekArray,
        weekHash							: 			weekHash,
        getDateObjOnIndex					:			getDateObjOnIndex,
        dayColObjectArray					:		    dayColObjectArray,
        paidHourArray						:			paidHourArray
    };

});