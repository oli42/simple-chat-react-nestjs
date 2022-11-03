import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private readonly service;
    createUser(body: any): Promise<any>;
    uploadFile(id: number, file: any, params: any): Promise<any>;
    getFile(filename: string, res: any): Promise<void>;
    login(body: any): Promise<any>;
    logout(body: any): Promise<any>;
    getUsers(): Promise<any>;
}
