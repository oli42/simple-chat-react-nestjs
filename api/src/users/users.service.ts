import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
       
	) {}

	async createUser(body): Promise<User> {
		const user = await this.userRepository.create();
        user.username = body.username;
        user.email = body.email;
		const salt = await bcrypt.genSalt();
      	user.password = await bcrypt.hash(body.password, salt);
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
		return true;
	}
}