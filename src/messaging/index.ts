
import {PubSub} from '@google-cloud/pubsub'

const pubSubClient = new PubSub()


// this way is easier
// creating local topic object that isn't actually in GCP but can be connected 
// instead of topic write createTopic  and start the server then it will --> it will create a topic in GCP Topics
export const userTopic =  pubSubClient.topic('projects/manifest-frame-279818/topics/user-service')



/*
export const userTopic2 = getUserTopic()

// probably better way because it fetches all the information from gcp about the topic 
async function getUserTopic(){
    let [topics] = await pubSubClient.getTopics()
    return topics.find((topic)=>{
        return topic.name === 'projects/manifest-frame-279818/topics/user-service'
    })
}
*/