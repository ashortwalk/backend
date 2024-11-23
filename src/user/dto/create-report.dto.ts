import { IsNotEmpty, IsString } from 'class-validator';
import { ContentType } from '../types/report.type';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  readonly contentType: ContentType;

  @IsString()
  @IsNotEmpty()
  readonly contentId: string;

  @IsString()
  @IsNotEmpty()
  readonly reportTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly reportContent: string;
}
