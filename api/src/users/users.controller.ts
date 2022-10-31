import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import User from "./entities/user.entity";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
	
    @Inject(UsersService)
	private readonly service: UsersService;

    @Post('/createUser')
    async createUser(@Body() body: any): Promise<any>{
		return await this.service.createUser(body);
		
	}

    @Post("/:id/upload")
    @UseInterceptors(FileInterceptor("file", {
            storage: diskStorage({
                destination: "./upload", filename: (req, file, callback) => {
                let fileName = (Math.random() + 1).toString(36).substring(7);
                callback(null, fileName + extname(file.originalname))
            }
        })
    }))
    async uploadFile(
	@Param('id', ParseIntPipe) id: number,
	@UploadedFile() file: any, 
	@Body() params: any) 
	{	
		let url = "http://localhost:4000/users/" + file.path;
		return this.service.updateAvatar(id, url)
    } 

	// @Get("upload/:filename")
    // async getFile(@Param("filename") filename: string, @Res() res: any) {
    //     res.sendFile(filename, { root: './upload' });
    // }
}