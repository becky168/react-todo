var moment = require("moment");

console.log(moment().format());

// unix time
// January 1st 1970 @ 12:00am -> 0
// January 1st 1970 @ 12:01am -> 60 (secondes)
// January 1st 1970 @ 11:59am -> -60 (secondes)

var now = moment();
console.log("current timestamp: ", now.unix());

var timestamp = 148505361;
var currentMoment = moment.unix(timestamp);
console.log("current moment", currentMoment.format("MMM D, YY @ h:mm a"));

// January 3rd, 2016 @ 12:13 AM
console.log("current moment", currentMoment.format("MMMM Do, YYYY @ h:mm A"));