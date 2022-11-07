import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService){}

    @Inject(ChatService)
    private readonly service: ChatService

    @Post('/checkOrCreateRoom')
    async checkOrCreateRoom(@Body() body:any): Promise<any> {
        return await this.service.checkOrCreateRoom(body);
    }

    @Post('saveMessage')
    async saveMessage(@Body() body:any): Promise<any> { // username, tag
        return await this.service.saveMessage(body);
    }
    
    @Get('getRoomMessages/:id')
    async getRoomMessages(@Param('id') id: number, @Body() body: any): Promise<any> 
    {
        return await this.service.getRoomMessages(id);
    }
}