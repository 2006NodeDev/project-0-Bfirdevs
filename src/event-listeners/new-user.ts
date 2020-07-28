

// all of the event listeners for the new user event 

import { expressEventEmitter, customExpressEvents } from ".";
import { Users } from "../models/Users";
import { userTopic } from "../messaging";

// custom event listerner that will fire when someone emits the New User event
// by default event listeners fire in order and synchronously 
expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser: Users )=> {
    // put them in pub sub
    // allows us to resolve the contained function asynchronously 
    setImmediate(async()=>{
        try {
          let res = await userTopic.publishJSON(newUser)
          console.log(res); // returns the message id
        } catch (error) {
            console.log(error)
        }
    
    })
})

