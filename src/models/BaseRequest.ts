import { User } from 'src/domains/user-details/entities/User';
//ALl request must have to extends base if need to use requester user object
export class BaseRequest {

    requesterUserObject: User;

}