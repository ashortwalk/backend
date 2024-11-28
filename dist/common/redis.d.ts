import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class RedisModule implements OnModuleInit, OnModuleDestroy {
    private redisClient;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    setValue(key: string, value: string, expiresIn: number): Promise<void>;
    getValue(key: string): Promise<string | null>;
    deleteValue(key: string): Promise<void>;
}
