/*
 Copyright (c) 2006, NAKAMURA Satoru
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 * Neither the name of the NAKAMURA Satoru nor the names of its contributors
 may be used to endorse or promote products derived from this
 software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * DateFormatter
 *
 * @website http://clonedoppelganger.net/
 * @version 0.0.1
 *
 * Example:
 *  var now = new Date();
 *  alert(DateFormatter.format(now, "Y/m/d H:i:s"));
 */
var DateFormatter = {

  /**
   * format
   * @param  {Date} target date object
   *         {String} pattern
   *  Y : A full numeric representation of a year, 4 digits
   *  y : A two digit representation of a year
   *  m : Numeric representation of a month, with leading zeros
   *  n : Numeric representation of a month, without leading zeros
   *  F : A full textual representation of a month, such as January or March
   *  M : A short textual representation of a month, three letters
   *  O : Japanese old month name
   *  d : Day of the month, 2 digits with leading zeros
   *  j : Day of the month without leading zeros
   *  w : Numeric representation of the day of the week
   *  l : A full textual representation of the day of the week
   *  D : A textual representation of a day, three letters
   *  N : ISO-8601 numeric representation of the day of the week
   *  J : A Japanese textual representation of the day of the week
   *  g : 12-hour format of an hour without leading zeros
   *  G : 24-hour format of an hour without leading zeros
   *  h : 12-hour format of an hour with leading zeros
   *  H : 24-hour format of an hour with leading zeros
   *  i : Minutes with leading zeros
   *  s : Seconds, with leading zeros
   *  a : Lowercase Ante meridiem and Post meridiem (am or pm)
   *  A : Uppercase Ante meridiem and Post meridiem （AM or PM）
   *  S : English ordinal suffix for the day of the month, 2 characters
   *  z : The day of the year (starting from 0)
   *  t : Number of days in the given month
   *  L : Whether it's a leap year
   *  RIB : Altametrics formater i.e. 6a OR 6:30a etc
   *  Escape character is #. Example: DateFormatter.format(new Date(), "#Y#m#d #i#s Ymd");
   * @return {String} formatted date
   */
  format: function (d, pattern, langId) {
    if (langId == "undefined" || langId == null || langId.trim() == "") {
      langId = "NoLang"
    }
    if (typeof pattern != "string") return;
    var dYear = d.getFullYear();
    var dMonth = d.getMonth();
    var dDate = d.getDate();
    var dDay = d.getDay();
    var dHours = d.getHours();
    var dMinutes = d.getMinutes();
    var dSeconds = d.getSeconds();
    var res = "";
    if(pattern === "RIB"){
        res = this.from24to12(dHours) + (":" + this.preZero(dMinutes))  + this.ap(dHours);
    }
    else if(pattern === "RIB_DT"){
        res = this.preZero(dMonth + 1) +'/' +this.preZero(dDate) +'/' + dYear + " "+ this.from24to12(dHours) + (":" + this.preZero(dMinutes))  + this.ap(dHours);
    }
    else {
        for (var i = 0, len = pattern.length; i < len; i++) {
            var c = pattern.charAt(i);
            switch (c) {
                case "#":
                    if (i == len - 1) break;
                    res += pattern.charAt(++i);
                    break;
                case "Y":
                    res += dYear;
                    break;
                case "y":
                    res += dYear.toString().substr(2, 2);
                    break;
                case "m":
                    res += this.preZero(dMonth + 1);
                    break;
                case "n":
                    res += dMonth + 1;
                    break;
                case "d":
                    res += this.preZero(dDate);
                    break;
                case "j":
                    res += dDate;
                    break;
                case "w":
                    res += dDay;
                    break;
                case "N":
                    res += this.isoDay(dDay);
                    break;
                case "l":
                     if(langId!="NoLang"){
                         res += this.weekFullInLocal(langId,dDay);
                         break;
                     }
                    res += this.weekFullEn[dDay];
                    break;
                case "D":
                    if (langId != "NoLang") {
                        res += this.getDayInLocal(langId, dDay);
                        break;
                    }
                    res += this.weekFullEn[dDay].substr(0, 3);
                    break;
                case "J":
                    res += this.weekJp[dDay];
                    break;
                case "F":
                	if (langId != "NoLang") {
                        res += this.getMonthInLocal(langId,dMonth);
                        break;
                    }
                    res += this.monthFullEn[dMonth];
                    break;
                case "M":
                	if (langId != "NoLang") {
                        res += this.getMonthAbbrInLocal(langId,dMonth);
                        break;
                    }
                    res += this.monthFullEn[dMonth].substr(0, 3);
                    break;
                case "O":
                    res += this.monthOldJp[dMonth];
                    break;
                case "a":
                    res += this.ampm(dHours);
                    break;
                case "P":
                    res += this.ap(dHours);
                    break;
                case "A":
                    res += this.ampm(dHours).toUpperCase();
                    break;
                case "H":
                    res += this.preZero(dHours);
                    break;
                case "h":
                    res += this.preZero(this.from24to12(dHours));
                    break;
                case "g":
                    res += this.from24to12(dHours);
                    break;
                case "G":
                    res += dHours;
                    break;
                case "i":
                    res += this.preZero(dMinutes);
                    break;
                case "s":
                    res += this.preZero(dSeconds);
                    break;
                case "t":
                    res += this.lastDayOfMonth(d);
                    break;
                case "L":
                    res += this.isLeapYear(dYear);
                    break;
                case "z":
                    res += this.dateCount(dYear, dMonth, dDate);
                    break;
                case "S":
                    res += this.dateSuffix[dDate - 1];
                    break;
                default :
                    res += c;
                    break;
            }
        }
    }
    return res;
  },

  weekFullEn: ["Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"],

  weekJp: ["日", "月", "火", "水", "木", "金", "土"],

  monthFullEn: ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"],

  monthOldJp: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月",
    "文月", "葉月", "長月", "神無月", "霜月", "師走"],

  dateSuffix: [
    "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
    "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
    "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"],

  preZero: function (value) {
    return (parseInt(value) < 10) ? "0" + value : value;
  },

  from24to12: function (hours) {
    return (hours > 12) ? hours - 12 : (hours == 0 ? 12 : hours);
  },

  ampm: function (hours) {
    return (hours < 12) ? "am" : "pm";
  },
  ap: function (hours) {
    return (hours < 12) ? "a" : "p";
  },

  isoDay: function (day) {
    return (day == 0) ? "7" : day;
  },

  lastDayOfMonth: function (dateObj) {
    var tmp = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
    tmp.setTime(tmp.getTime() - 1);
    return tmp.getDate();
  },

  isLeapYear: function (year) {
    var tmp = new Date(year, 0, 1);
    var sum = 0;
    for (var i = 0; i < 12; i++) {
      tmp.setMonth(i);
      sum += this.lastDayOfMonth(tmp);
    }
    return (sum == 365) ? "0" : "1";
  },

  dateCount: function (year, month, date) {
    var tmp = new Date(year, 0, 1);
    var sum = -1;
    for (var i = 0; i < month; i++) {
      tmp.setMonth(i);
      sum += this.lastDayOfMonth(tmp);
    }
    return sum + date;
  },
  getMonthAbbrInLocal: function (lngIID, month) {
	    var lagnHash = {
	      "es": ["ene","feb","mar","abr","may","jun",
	             "jul","ago","sep","oct","nov","dic"],
	      "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	      "fr":["&#106;&#97;&#110;&#118;","&#102;&#101;&#118;&#114;","&#109;&#97;&#114;&#115;","&#97;&#118;&#114;&#105;&#108;","&#109;&#97;&#105;"," &#106;&#117;&#105;&#110;",
	            "&#106;&#117;&#105;&#108;","&#97;&#111;&#117;&#116;","&#115;&#101;&#112;&#116;","&#111;&#99;&#116;","&#110;&#111;&#118;","&#100;&#101;&#99;"],
	      "zh": ["&#19968;&#26376;", "&#20108;&#26376;", " &#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;", "&#20845;&#26376;",
	             "&#19971;&#26376;", "&#19971;&#26376;", "&#20061;&#26376;", " &#21313;&#26376;", " &#21313;&#19968;&#26376;", " &#21313;&#20108;&#26376;"],
        "de": ["Jan", "Feb.", "März", "Apr.", "Mai", "Juni",
               "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez"],
          "it": ["genn", "febbr", "mar", "apr", "magg", "giugno",
                 "luglio", "ag", "sett", "ott", "nov", "dic"]
	    }
	    return lagnHash[lngIID][month];
	  },
  getMonthInLocal: function (lngIID, month) {
	    var lagnHash = {
	      "es": ["enero","febrero","marzo","abril","mayo","junio",
	             "julio","agosto","septiembre","octubre","noviembre","diciembre"],
	      "en": ["January", "February", "March", "April", "May", "June",
	             "July", "August", "September", "October", "November", "December"],
	      "fr":["janvier","février","mars","avril","mai","juin",
	            "juillet","août","septembre","octobre","novembre","décembre"],
	      "zh": ["&#19968;&#26376;", "&#20108;&#26376;", " &#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;", "&#20845;&#26376;",
	             "&#19971;&#26376;", "&#19971;&#26376;", "&#20061;&#26376;", " &#21313;&#26376;", " &#21313;&#19968;&#26376;", " &#21313;&#20108;&#26376;"],
        "de": ["Januar", "Februar", "Marz", "April", "Mai", "Juni",
               "Juli", "August", "September", "Oktober", "November", "Dezember"],
        "it": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
               "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
	    }
	    return lagnHash[lngIID][month];
	  },
  getDayInLocal: function (lngIID, day) {
    var lagnHash = {
      "es": ["Dom", "Lu", "Ma", "Mx", "Ju", "Vi", "Sab"],
      "en": [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      "fr": ["Dim","Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      "zh": [ "&#21608;&#26085;", "&#21608;&#19968;", "&#21608;&#20108;", "&#21608;&#19977;", "&#21608;&#22235;", "&#21608;&#20116;", "&#21608;&#20845;"],
      "de": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
       "it": ["dom", "lun", "mar", "mer", "gio", "ven", "sab"]
    }
    return lagnHash[lngIID][day];
  },
    weekFullInLocal : function(langId,dayIndex){
        var dayHashOnLang ={
            "en":["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"],
            "es":["domingo", "lunes", "martes","miércoles", "jueves", "viernes", "sábado"],
            "fr":["dimanche", "lundi", "mardi","mercredi", "jeudi", "vendredi", "samedi"],
            "zh":["星期天", "星期一", "星期二","星期三", "星期四", "星期五", "星期六"],
          "de":["Sonntag", "Montag", "Dienstag	","Mittwoch", "Donnerstag", "Freitag", "Samstag"],
          "it":["domenica", "luned\u00ec", "marted\u00ec","mercoled\u00ec", "gioved\u00ec", "venerd\u00ec", "sabato"]
        }
        return dayHashOnLang[langId][dayIndex]
    }
}
