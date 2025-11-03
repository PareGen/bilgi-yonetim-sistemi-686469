import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateAuditlogDto, AuditlogResponseDto, UpdateAuditlogDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuditlogsService } from './auditlogs.service';

@Controller('auditlogs')
@UseGuards(JwtAuthGuard)
export class AuditlogsController {
  constructor(private readonly auditlogsService: AuditlogsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<AuditlogResponseDto[]> {
    return this.auditlogsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<AuditlogResponseDto> {
    return this.auditlogsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateAuditlogDto,
    @CurrentUser() user: User
  ): Promise<AuditlogResponseDto> {
    return this.auditlogsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAuditlogDto,
    @CurrentUser() user: User
  ): Promise<AuditlogResponseDto> {
    return this.auditlogsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.auditlogsService.remove(id, user.id);
  }
}
