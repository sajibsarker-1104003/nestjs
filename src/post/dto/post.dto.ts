import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public content: string;

  public authorId: string;
}
