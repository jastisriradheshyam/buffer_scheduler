var Scheduler = require('./buffer_scheduler');
var sch = new Scheduler(4, 9000, 5);
sch.getEvent((dataArray) => {
    console.log("got event with data --> ", dataArray)
});
var l = 1;
setInterval(() => { sch.addElement("max" + l++) }, 4000);