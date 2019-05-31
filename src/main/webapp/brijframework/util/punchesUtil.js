webApp.factory('punchesUtil', function (dateUtil,timeUtil, $rootScope, $compile) {
   function punchProjStatusID(mntsToProjLawViol, isWeeklyOTViolated) {
         if (chkUndefinedOrNull(mntsToProjLawViol)) {
             return "NOT_ELIGIBLE";
         }
         if (!chkUndefinedOrNull(isWeeklyOTViolated) && isWeeklyOTViolated) {
             return "VIOLATED_RULE";
         }
         else if (mntsToProjLawViol <= 0) {
             return "VIOLATED_RULE_ORANGE";
         } else {
             return "NOT_IN_DANGER";
         }
     };

     function punchViolCounter(violateAt, approachingAlertMin) {
         if (violateAt == null)
             return null;
         var difference = dateUtil.minsBetweenTime(violateAt, timeUtil.getCurrentTime());
         if (difference <= approachingAlertMin && difference > 0) {
             return difference;
         } else {
             return null;
         }
     };
     
     function punchStatusID(violateAt, approachingAlertMin, dangPeriodAlertMin) {
         if (violateAt == null)
             return 'NOT_ELIGIBLE';
         else {
             var difference = dateUtil.minsBetweenTime(violateAt, timeUtil.getCurrentTime());
             if (difference <= 0) {
                 return 'VIOLATED_RULE';
             }
             else if (difference <= dangPeriodAlertMin) {
                 return 'ENTERED_DANGEROUS_PERIOD';
             }
             else if (difference <= approachingAlertMin) {
                 return 'APPROACHING_THRESHOLD';
             }
             else if (difference > approachingAlertMin) {
                 return 'NOT_IN_DANGER';
             }
             else
                 return "NOT_ELIGIBLE";
         }
     };
     
     function formatShiftTime(time, shift) {
         var timeArr = time.split(" - ");
         if (timeArr.length > 1)
             timeArr = time.split(" -");
         if (timeArr.length > 1)
             timeArr = time.split("-");
         if (timeArr.length > 1)
             timeArr = time.split("- ");
         var startTime = timeArr[0].trim().substr(0, timeArr[0].trim().length - 2);
         var endTime = timeArr[1].trim().substr(0, timeArr[1].trim().length - 2);
         var startTimeArr = startTime.split(":");
         if (startTimeArr.length > 1) {
             shift.startTime = parseInt(startTimeArr[0]) * 60 + parseInt(startTimeArr[1]);
         } else {
             shift.startTime = parseInt(startTimeArr[0]) * 60;
         }
         var endTimeArr = endTime.split(":");
         if (endTimeArr.length > 1) {
             shift.endTime = parseInt(endTimeArr[0]) * 60 + parseInt(endTimeArr[1]);
         } else {
             shift.endTime = parseInt(endTimeArr[0]) * 60;
         }
     }

     function shiftTime(shift) {
         if (dateUtil.formatTime(shift.endTime) == "12a" && dateUtil.formatTime(shift.startTime) == "12a") {
             return getMsgForId("ALL_DAY");
         } else {
             return dateUtil.formatTime(shift.startTime) + '-' + dateUtil.formatTime(shift.endTime);
         }
     }

     function shiftSlotTime(shiftSlot) {
         if (shiftSlot.startIndex === 0 && shiftSlot.endIndex === 95) {
             return "ALL DAY";
         }
         return dateUtil.formatTime(shiftSlot.startIndex * 15) + '-' + dateUtil.formatTime((shiftSlot.endIndex + 1) * 15);
     }


     return {
    	 punchStatusID						:			 punchStatusID,
         punchProjStatusID					: 			 punchProjStatusID,
         punchViolCounter					: 			 punchViolCounter,
         formatShiftTime					: 			formatShiftTime,
         shiftTime							:			shiftTime,
         shiftSlotTime						:			shiftSlotTime
     }
     
});