
import { 
    WebSocketGateway, SubscribeMessage, MessageBody,  
    OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,
    WebSocketServer,
    ConnectedSocket, 
  } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'typeorm';
import { ChatService } from './chat.service';
  
@WebSocketGateway(8000, { cors: '*'})
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}
    
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
      // console.log('initialized');
    }
    
    handleConnection(client: Socket, ...args: any[]) {
      // console.log(`Client connected: ${client.id}`);
    }
    
    handleDisconnect(client: Socket) {
      // console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('newUserClient')
    handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      // console.log('Received message in Back', alert);
      this.server.emit('newUserServer', alert);
    }

    @SubscribeMessage('messageFromClient')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody()  message: any): void {
      // console.log('Received message in Back', message);
      this.server.emit('messageFromServer', message);
      this.chatService.saveMessage(message);

    }

    @SubscribeMessage('alertClient')
    handleAlert(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      // console.log('Received alert in Back', alert);
      this.server.emit('alertServer', alert);
    }
}