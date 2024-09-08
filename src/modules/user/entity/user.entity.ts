import { pick } from 'lodash';
import { IUser } from '../db/model';

export interface IUserEntity {
    _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export class UserEntity {
    private _id: string;
    private name: string;
    private phone: string;
    private email: string;
    private password: string;
    private is_admin: boolean;

    constructor(user:IUser){
        Object.assign(this,pick(user,['_id', 'name', 'phone', 'email', 'password', 'is_admin']));
    }
    serialize():IUserEntity{
        return{
            _id: this._id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            password: this.password,
            is_admin: this.is_admin,
        }
    }

}