import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "src/users/entities/user.entity";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { Message } from "./entities/message.entity";
import {Room} from "./entities/room.entity";

@Module({
    controllers: [ChatController],
    providers: [ChatService, ChatGateway], 
    imports: [
      TypeOrmModule.forFeature([User, Room, Message]), 
   ],
   exports: [ChatService]
  
  })
  export class ChatModule {}