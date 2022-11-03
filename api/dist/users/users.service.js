"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(body) {
        const user = await this.userRepository.create();
        user.username = body.username;
        user.email = body.email;
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(body.password, salt);
        user.online = true;
        await this.userRepository.save(user);
        return user;
    }
    async updateAvatar(id, image) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        user.avatar = image;
        await this.userRepository.save(user);
        return user;
    }
    async login(body) {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        const match = bcrypt.compareSync(body.password, user.password);
        if (!match)
            return { error: "Mot de passe invalide" };
        user.online = true;
        await this.userRepository.save(user);
        return user;
    }
    async logout(body) {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        if (!user)
            return { error: "No user" };
        user.online = false;
        await this.userRepository.save(user);
        return user;
    }
    async getUsers() {
        const users = await this.userRepository.find();
        return users;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map