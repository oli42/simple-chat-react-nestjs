import User from "src/users/entities/user.entity";
import { Repository } from "typeorm";
export declare class ChatService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
