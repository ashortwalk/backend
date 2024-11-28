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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_2.Repository {
    constructor(repo, entityManager) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
    }
    async findUserById(id) {
        const user = await this.findOneBy({ id });
        return user;
    }
    async findUserByNickname(nickname) {
        const user = await this.findOneBy({ nickname });
        return user;
    }
    async findByEmail(email) {
        return await this.findOneBy({ email });
    }
    async findByKakaoPassword(password) {
        return await this.findOne({ where: { password, type: 'kakao' } });
    }
    async createUser(email, nickname, password, type) {
        const user = new entities_1.UserEntity();
        user.email = email;
        user.nickname = nickname;
        user.password = password;
        user.type = type;
        return await this.save(user);
    }
    async updateUser(id, nickname) {
        const user = await this.findOneBy({ id });
        if (!user) {
            throw new common_1.BadRequestException();
        }
        user.nickname = nickname;
        const updatedUser = await this.save(user);
        delete updatedUser.password;
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.softRemove({ id });
        if (!user) {
            throw new common_1.BadRequestException();
        }
        return true;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], UserRepository);
//# sourceMappingURL=user.repository.js.map