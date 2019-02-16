# Buffer scheduler

Here **buffer** is not the data type, it is a **logical buffer** (*set of elements*).  

- This library will **trigger** the **callback** whenever
    - **minimum time** runs out or
    - buffer got more than **min elements** in the buffer
    - which ever condition **fullfils first**.  
- This library also supports the **maximum number of elements** to be returned from the buffer in the callback.

----
## Usage
`let buffSch = new Scheduler(minLength, minTime, maxReturnLength)`
- **minLength:** minimum length after which event is triggered
- **minTime:** minimum time interval after which event is triggered
- **maxReturnLength:** maximum callback return array length

### Example:
```
var Scheduler = require('./buffer_scheduler');
var buffSch = new Scheduler(4, 9000, 5);
buffSch.getEvent((dataArray) => {
    console.log("got event with data --> ", dataArray)
});

var l = 1;
setInterval(() => { buffSch.addElement("max" + l++) }, 4000);
```
----

#### Contributers
[@jastisriradheshyam](https://github.com/jastisriradheshyam)