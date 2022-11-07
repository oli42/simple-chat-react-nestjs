import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { Room } from "./entities/room.entity";

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    ){}
    
    
   async checkOrCreateRoom(body){

    const roomFrom = await this.roomRepository.findOne({where: {to: body.to[1], from: body.from}});
    if (roomFrom){
      roomFrom.active = true;
    await this.roomRepository.save(roomFrom);

      return (roomFrom);
    }
    const roomTo = await this.roomRepository.findOne({where: {from: body.to[1], to:body.from }});
    if (roomTo){
      roomTo.active = true;
    await this.roomRepository.save(roomTo);

      return (roomTo);
    }
    const newRoom = await this.roomRepository.create();
    newRoom.from = body.from;
    newRoom.to = body.to[1];
    newRoom.tagFrom = body.from + "|" + body.to[1];
    newRoom.tagTo = body.to[1] + "|" + body.from;
    newRoom.active = true;
    await this.roomRepository.save(newRoom);
    return newRoom;
   }


   async saveMessage(message) {

    const newMessage = await this.messageRepository.create();
    newMessage.fromUsername = message.messageData.fromUsername;
    newMessage.time = message.messageData.time;
    newMessage.text = message.messageData.text;
    newMessage.roomTag = message.messageData.room;
    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async getRoomMessages(id) {

    const roomMessages = await this.messageRepository.find({where: {roomTag: id}});
    if (!roomMessages[0])
      return false;
    if (roomMessages.length > 20)
    {
      const sortMessages =  roomMessages.slice(roomMessages.length - 20);
      return sortMessages;
    } 
    return roomMessages;
  }
  }