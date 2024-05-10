import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;
}

export class DeclinePostDto {
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @IsNotEmpty()
  reason: string;
}
