import { createClient, RedisClientType } from 'redis';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class RedisModule implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType; // 클라이언트 타입을 직접 지정

  constructor() {
    // Redis 클라이언트 생성
    this.redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    // Redis 연결 성공 시
    this.redisClient.on('connect', () => {
      console.info('Redis connected!');
    });

    // Redis 오류 발생 시
    this.redisClient.on('error', (err: any) => {
      console.error('Redis Client Error', err);
    });
  }

  // 모듈 초기화 시 Redis 연결
  async onModuleInit() {
    try {
      await this.redisClient.connect(); // 비동기 연결
    } catch (err) {
      console.error('Error connecting to Redis', err);
    }
  }

  // 모듈 종료 시 Redis 연결 종료
  async onModuleDestroy() {
    try {
      await this.redisClient.quit(); // 연결 종료
    } catch (err) {
      console.error('Error disconnecting from Redis', err);
    }
  }

  // 값 설정 (키, 값, 만료 시간)
  async setValue(key: string, value: string, expiresIn: number): Promise<void> {
    try {
      await this.redisClient.setEx(key, expiresIn, value); // setEx 사용
    } catch (err) {
      console.error('Error setting value in Redis', err);
    }
  }

  // 값 가져오기
  async getValue(key: string): Promise<string | null> {
    try {
      return await this.redisClient.get(key); // get 사용
    } catch (err) {
      console.error('Error getting value from Redis', err);
      return null;
    }
  }

  // 값 삭제
  async deleteValue(key: string): Promise<void> {
    try {
      await this.redisClient.del(key); // del 사용
    } catch (err) {
      console.error('Error deleting value from Redis', err);
    }
  }
}
