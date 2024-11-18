import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly category: string;
}
