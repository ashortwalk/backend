export type UserRole = 'admin' | 'user';
export type UserType = 'local' | 'kakao' | 'google';
export type TokenPayload = { id: string; role: string; nickname: string };
