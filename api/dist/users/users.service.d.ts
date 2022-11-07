import User from "./entities/user.entity";
import { Repository } from 'typeorm';
import { Room } from "src/chat/entities/room.entity";
export declare class UsersService {
    userRepository: Repository<User>;
    private readonly roomRepository;
    constructor(userRepository: Repository<User>, roomRepository: Repository<Room>);
    createUser(body: any): Promise<User>;
    updateAvatar(id: number, image: string): Promise<any>;
    login(body: any): Promise<any>;
    logout(body: any): Promise<any>;
    getUsers(): Promise<any>;
    checkUser(body: any): Promise<any>;
}
