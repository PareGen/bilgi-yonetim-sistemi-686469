import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MinLength(1)
  title!: string;

  content!: Record<string, unknown>;

  @IsNumber()
  version!: number;

  @IsUUID()
  ownerId!: string;
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  content?: Record<string, unknown> | undefined;

  @IsOptional()
  @IsNumber()
  version?: number | undefined;

  @IsOptional()
  @IsUUID()
  ownerId?: string | undefined;
}

export class DocumentResponseDto {
  id!: string;
  title!: string;
  content!: Record<string, unknown>;
  version!: number;
  ownerId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
