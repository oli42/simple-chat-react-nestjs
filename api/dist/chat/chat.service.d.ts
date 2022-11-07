import User from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { Room } from "./entities/room.entity";
export declare class ChatService {
    private readonly userRepository;
    private readonly roomRepository;
    private readonly messageRepository;
    constructor(userRepository: Repository<User>, roomRepository: Repository<Room>, messageRepository: Repository<Message>);
    checkOrCreateRoom(body: any): Promise<Room>;
    saveMessage(message: any): Promise<Message>;
    getRoomMessages(id: any): Promise<false | Message[]>;
}
