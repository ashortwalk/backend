import { createClient } from 'redis';
import { Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
@Injectable()
export class RedisModule {
  private readonly redisClient: RedisClientType<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>
  >;

  constructor() {
    this.redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
      legacyMode: true,
    });

    this.redisClient.on('connect', () => {
      console.info('Redis connected!');
    });

    this.redisClient.on('error', (err: any) => {
      console.error('Redis Client Error', err);
    });

    this.redisClient.connect().then();
  }

  async setValue(key: string, value: string, expiresIn: number): Promise<void> {
    await this.redisClient.v4.set(key, value, 'EX', expiresIn);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.v4.get(key);
  }
  async deleteValue(key: string): Promise<void> {
    await this.redisClient.v4.del(key);
  }
}
