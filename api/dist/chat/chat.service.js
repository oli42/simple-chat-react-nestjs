"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const room_entity_1 = require("./entities/room.entity");
let ChatService = class ChatService {
    constructor(userRepository, roomRepository, messageRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }
    async checkOrCreateRoom(body) {
        console.log('back to', body.to);
        console.log('back from', body.from);
        const roomFrom = await this.roomRepository.findOne({ where: { to: body.to[1], from: body.from } });
        if (roomFrom) {
            roomFrom.active = true;
            await this.roomRepository.save(roomFrom);
            return (roomFrom);
        }
        const roomTo = await this.roomRepository.findOne({ where: { from: body.to[1], to: body.from } });
        if (roomTo) {
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
        const roomMessages = await this.messageRepository.find({ where: { roomTag: id } });
        if (!roomMessages[0])
            return false;
        if (roomMessages.length > 20) {
            const sortMessages = roomMessages.slice(roomMessages.length - 20);
            return sortMessages;
        }
        return roomMessages;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(2, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map