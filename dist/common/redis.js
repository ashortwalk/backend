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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const redis_1 = require("redis");
const common_1 = require("@nestjs/common");
let RedisModule = class RedisModule {
    constructor() {
        this.redisClient = (0, redis_1.createClient)({
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
            },
        });
        this.redisClient.on('connect', () => {
            console.info('Redis connected!');
        });
        this.redisClient.on('error', (err) => {
            console.error('Redis Client Error', err);
        });
    }
    async onModuleInit() {
        try {
            await this.redisClient.connect();
        }
        catch (err) {
            console.error('Error connecting to Redis', err);
        }
    }
    async onModuleDestroy() {
        try {
            await this.redisClient.quit();
        }
        catch (err) {
            console.error('Error disconnecting from Redis', err);
        }
    }
    async setValue(key, value, expiresIn) {
        try {
            await this.redisClient.setEx(key, expiresIn, value);
        }
        catch (err) {
            console.error('Error setting value in Redis', err);
        }
    }
    async getValue(key) {
        try {
            return await this.redisClient.get(key);
        }
        catch (err) {
            console.error('Error getting value from Redis', err);
            return null;
        }
    }
    async deleteValue(key) {
        try {
            await this.redisClient.del(key);
        }
        catch (err) {
            console.error('Error deleting value from Redis', err);
        }
    }
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisModule);
//# sourceMappingURL=redis.js.map