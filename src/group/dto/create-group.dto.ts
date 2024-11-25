import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {

    @IsString()
    @IsNotEmpty()
    readonly groupName: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly tag: string;
}