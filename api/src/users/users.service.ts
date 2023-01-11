import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Room } from "src/chat/entities/room.entity";

@Injectable()
export class UsersService {
    constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
		@InjectRepository(Room)
    	private readonly roomRepository: Repository<Room>,
       
	) {}

	async createGlobalUser(body): Promise<any> {
		const exist = await this.userRepository.findOne({where: {username: body.username}});
		if (exist)
			return exist;
		const user = await this.userRepository.create();
        user.username = body.username;
        user.email = body.email;
		const salt = await bcrypt.genSalt();
      	user.password = await bcrypt.hash(body.password, salt);
		user.online = true;
		user.room = 'forum'
		user.avatar = 'http://localhost:4000/users/upload/forum.png'
		await this.userRepository.save(user);
		return user;
	}

	async createUser(body): Promise<any> {
		const exist = await this.userRepository.findOne({where: {email: body.email}});
		if (exist)
			return false;
		const user = await this.userRepository.create();
        user.username = body.username;
        user.email = body.email;
		const salt = await bcrypt.genSalt();
      	user.password = await bcrypt.hash(body.password, salt);
		user.online = true;
		await this.userRepository.save(user);
		return user;
	}

	async updateAvatar(id: number, image: string): Promise<any> {
		const user = await this.userRepository.findOne({where: {id: id}});
		user.avatar = image;
		await this.userRepository.save(user);
		return user;
	}

	async login(body): Promise<any>{
		const user = await this.userRepository.findOne({where:{email:body.email}});
		const match = bcrypt.compareSync(body.password, user.password);
		if (!match)
			return {error: "Mot de passe invalide"};
		user.online = true;
		await this.userRepository.save(user);
		return user;
	}

	async logout(body): Promise<any> {
		const user = await this.userRepository.findOne({where:{email:body.email}});
		if (!user)
			return {error: "No user"};
		user.online = false;
		await this.userRepository.save(user);
		return user;
	}

	async getUsers() : Promise<any> {
		const users = await this.userRepository.find();
		return users;
	}

	async checkUser(body): Promise<any>{
		const user = await this.userRepository.findOne({where:{ username:body.username }});
		if (!user)
			return {error: "No user"};
			
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
}