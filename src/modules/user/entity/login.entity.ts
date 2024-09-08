import { pick } from 'lodash';

export interface ILoginEntity {
    message: string;
    token: string;
    
}

export class LoginEntity {
    private message: string;
    private token: string;

    constructor(loginData: ILoginEntity) {
        Object.assign(this, pick(loginData, ['message', 'token']));
    }

    serialize(): ILoginEntity {
        return {
            message: this.message,
            token: this.token,
        };
    }
}
