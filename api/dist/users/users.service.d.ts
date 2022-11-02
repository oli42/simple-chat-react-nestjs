import User from "./entities/user.entity";
import { Repository } from 'typeorm';
export declare class UsersService {
    userRepository: Repository<User>;
    constructor(userRepository: Repository<User>);
    createUser(body: any): Promise<User>;
    updateAvatar(id: number, image: string): Promise<any>;
    login(body: any): Promise<any>;
    getUsers(): Promise<any>;
}
