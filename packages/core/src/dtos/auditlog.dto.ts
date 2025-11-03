import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum AuditlogAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view'
}

export class CreateAuditlogDto {
  @IsUUID()
  documentId!: string;

  @IsEnum(AuditlogAction)
  action!: AuditlogAction;

  @IsUUID()
  userId!: string;

  @IsDate()
  timestamp!: Date;
}

export class UpdateAuditlogDto {
  @IsOptional()
  @IsUUID()
  documentId?: string | undefined;

  @IsOptional()
  @IsEnum(AuditlogAction)
  action?: AuditlogAction | undefined;

  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsDate()
  timestamp?: Date | undefined;
}

export class AuditlogResponseDto {
  id!: string;
  documentId!: string;
  action!: AuditlogAction;
  userId!: string;
  timestamp!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
