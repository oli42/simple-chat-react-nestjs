import { ChatService } from "./chat.service";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    private readonly service;
    checkOrCreateRoom(body: any): Promise<any>;
    saveMessage(body: any): Promise<any>;
    getRoomMessages(id: number, body: any): Promise<any>;
    createGlobalRoom(): Promise<any>;
}
