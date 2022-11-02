import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path, { extname } from "path";
import User from "./entities/user.entity";
import { UsersService } from "./users.service";
import { v4 as uuidv4 } from 'uuid';
import { saveImageToStorage } from "./users.utils";
import { of } from "rxjs";


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
    @UseInterceptors(FileInterceptor("file", saveImageToStorage
    // {

    //         storage: diskStorage({
    //             destination: "./upload",
    //             filename: (req, file, callback) => {
    //             const fileExtension: string = path.extname(file.originalname);
    //             const fileName: string = uuidv4() + fileExtension;
    //             callback(null, fileName);
    //         }
    //     }),
    // }
    ))
    async uploadFile(
	@Param('id', ParseIntPipe) id: number,
	@UploadedFile() file: any, 
	@Body() params: any) 
	{	
		let url = "http://localhost:4000/users/" + file.path;
		return this.service.updateAvatar(id, url)
    } 
    // async uploadFile(
    //     @Param('id', ParseIntPipe) id: number,
    //     @UploadedFile() file: Express.Multer.File)
    //     {	
    //         // const fileName = file?.filename;
    //         // if (!fileName) return of({error: 'File must be a png, jpeg or jpg'});
    //         let url = "http://localhost:4000/users/" + file.path;
    //         return this.service.updateAvatar(id, url)
    //     } 

	@Get("upload/:filename")
    async getFile(@Param("filename") filename: string, @Res() res: any) {
        res.sendFile(filename, { root: './upload' });
    }

    @Post('/login')
    async login(@Body() body: any): Promise<any>{
        return await this.service.login(body);
    }

    @Get('/getUsers')
    async getUsers(): Promise<any>{
        return await this.service.getUsers();
    }

}