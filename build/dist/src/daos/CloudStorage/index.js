"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageBucket = exports.bucketBaseUrl = exports.bucketName = void 0;
var storage_1 = require("@google-cloud/storage");
// bucket name
exports.bucketName = 'uzungolcabins-imagebucket';
// http pat for the bucket and image /{}
exports.bucketBaseUrl = "https://storage.googleapis.com/" + exports.bucketName; // url of the image 
exports.imageBucket = new storage_1.Storage().bucket(exports.bucketName);
//this is where we set up the cloud storage 
//# sourceMappingURL=index.js.map