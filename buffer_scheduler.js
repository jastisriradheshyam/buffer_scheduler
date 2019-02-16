// MIT License

// Copyright (c) 2019 Jasti Sri Radhe Shyam

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const EventEmitter = require('events');

/**
 * @class
 * @param {number} minLength minimum length after which event may trigger
 * @param {number} waitTime minimum time interval after event may trigger
 * @param {number} maxReturnLength maximum length of the array in callback (-1 for no limit)
*/
class Scheduler {
    constructor(minLength, waitTime, maxReturnLength) {
        /**
         * maximum length of the output array.
         * @type {number}
         */
        this.maxReturnLength = +maxReturnLength;
        /**
         * minimum length of the current array after which event is triggered.  
         * -1 for no limit
         * @type {number}
         */
        this.minLength = +minLength;
        /**
         * minimum time interval after which event is triggered.
         * @type {number}
         */
        this.waitTime = +waitTime;
        /**
         * current elements array that stores the incomming elements 
         * @type {number}
         */
        this.currentElementsArray = [];
        /**
         * trigger variable for event management 
         * @type {boolean}
         */
        this.trigger = false;
        /**
         * timeout object of interval
         * @type {NodeJS.Timeout}
         */
        this.intervalObj = this.setInterval();
        /**
         * event object
         * @type {eventEmmiter}
         */
        this.eventEmmiter = new EventEmitter();
    };

    /**
     * sets the interval and returns the timeout object
     * @method
     * @returns NodeJS.timeout
     */
    setInterval() {
        return setInterval(() => { this.waitEvent() }, this.waitTime);
    };

    /**
     * clears the interval
     * @method
     */
    clearInterval() {
        clearInterval(this.intervalObj);
    };

    /**
     * event for wait used in interval function as callback
     * @method
     */
    waitEvent() {
        if (this.currentElementsArray.length > 0 && this.trigger == false) {
            this.trigger = true;
            this.eventEmmiter.emit('trigger');
        }
    };

    /**
     * adds the element to the elements array
     * @method
     * @param {*} element 
     */
    addElement(element) {
        this.currentElementsArray.push(element);
        if (this.currentElementsArray.length >= this.minLength && this.trigger == false) {
            this.trigger = true;
            this.eventEmmiter.emit('trigger');
        }
    };

    /**
     * invoke the callback whenever the condition fullfils with 
     * array as arguments in callback
     * @method
     * @param {function} callback 
     */
    getEvent(callback) {
        this.eventEmmiter.on('trigger', () => {
            if (this.trigger == true) {
                let tempArray = [];
                let elementsLength = this.currentElementsArray.length;
                if (this.maxReturnLength == -1) {
                    for (let i = 0; i < elementsLength; i++) {
                        tempArray.push(this.currentElementsArray.shift());
                    }
                } else {
                    for (let i = 0; i < this.maxReturnLength && i < elementsLength; i++) {
                        tempArray.push(this.currentElementsArray.shift());
                    }
                }
                callback(tempArray);
                this.trigger = false;
            }
        });
    };
};

module.exports = Scheduler;