import { Module } from '@nestjs/common';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/chat/entities/room.entity';

@Module({
    controllers: [UsersController],
	providers: [UsersService],
 	imports: [
		 TypeOrmModule.forFeature([User, Room])
	],
	exports: [UsersService]
})

export class UsersModule {}
