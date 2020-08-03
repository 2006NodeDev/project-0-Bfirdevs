"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customExpressEvents = exports.expressEventEmitter = void 0;
var events_1 = require("events");
// this is a special node js object 
// its purpose is to hold event listeners and to send event triggers to those listeners 
//we can all the emit() to send an event
// any functions listening to that event on the emitter get triggered in order 
exports.expressEventEmitter = new events_1.EventEmitter();
exports.customExpressEvents = {
    NEW_USER: 'NEW_USER'
};
//# sourceMappingURL=index.js.map