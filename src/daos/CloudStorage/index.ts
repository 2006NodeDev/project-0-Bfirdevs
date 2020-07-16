import {Storage} from '@google-cloud/storage'

// bucket name
export const bucketName = 'very-first-bucket'


// http pat for the bucket and image /{}
export const bucketBaseUrl = `https://storage.cloud.google.com/${bucketName}`   // url of the image 

export const imageBucket = new Storage().bucket(bucketName)