import { getAllUsers, findUserById, submitNewUser, UpdateOnExistingUser } from "../daos/SQL/user-dao";
import { Users } from "../models/Users";
import { SaveProfilePicture } from "../daos/CloudStorage/user-images";
import { bucketBaseUrl } from "../daos/CloudStorage";
import { expressEventEmitter, customExpressEvents } from "../event-listeners";




// this call dao

export async function getAllUsersService():Promise<Users[]>{
    return await getAllUsers()
}

export async function findUserByIdService(id:number):Promise<Users>{
    return await findUserById(id)
}

export async function SubmitNewUserService(newUser:Users):Promise<Users>{
    
    try{
        let base64Image = newUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64,')
        let contentType = dataType.split('/').pop()
        if (newUser.image) {
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }
        let savedUser =  await submitNewUser(newUser)
        await SaveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/profile.${contentType}`)

        // with event driven design after I completed the save a user process 
        // I send an event saying this done with relevant info 
        expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
        
        return savedUser
    }catch (e){
        console.log(e)
        throw e 
    }
    
}

export async function UpdateOnExistingUserService(user:Users):Promise<Users>{
    return await UpdateOnExistingUser(user)
}