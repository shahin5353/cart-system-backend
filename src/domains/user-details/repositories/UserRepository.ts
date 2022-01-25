import { User } from '../entities/User';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { GetUserDetailsRequest } from '../requests/GetUserDetailsRequest';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    //Get user details with email and password
    public getUser = async (request: GetUserDetailsRequest) => { 
        let user: User = await this.findOne({
            where: {email: request.email, password: request.password}
        })
        if(user)delete(user.password);
        return user
    }

    public  findUserWithEmail= async (email:string) => { 
        let user: User =  await this.findOne({
            where: { email: email}
        });
        if(user)delete(user.password);
        return user
    }

    //Get user details with user id
    public  findUserWithId= async (uId: number) => { 
        let user: User =  await this.findOne({
            where: { id: uId }
        });
        if(user)delete(user.password);
        return user
    }
    
}
