import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){}
    
  }