import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string

  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean
}