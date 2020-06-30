import { UserDTO } from "../dtos/user-dto";
import { Users } from "../models/Users";

export function UsersDTOConvertors(udto:UserDTO): Users {

    return{
        userId: udto.userId,
	    username: udto.username,
	    password: udto.password,
	    firstName: udto.firstName,
	    lastName: udto.lastName,
	    email: udto.email,
		role: udto.role
	
    }

}