FROM  node:12.18-stretch

#copy files for the app
# copy node modules
#deal with env vars
#copy in the service account key for GCP



COPY build  project-0-Bfirdevs/build/
COPY node_modules project-0-Bfirdevs/node_modules/
COPY manifest-frame-279818-53f2e55cde60.json project-0-Bfirdevs


#this is the command that starts our application
CMD npm run deploy --prefix project-0-Bfirdevs/build    

# FROM and CMD that we need to put in docker file 