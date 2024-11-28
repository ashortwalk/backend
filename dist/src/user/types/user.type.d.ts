export type UserRole = 'admin' | 'user';
export type UserType = 'email' | 'kakao';
export type TokenPayload = {
    id: string;
    role: string;
    nickname: string;
};
