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
import type { CreateDocumentDto, DocumentResponseDto, UpdateDocumentDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DocumentsService } from './documents.service';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<DocumentResponseDto[]> {
    return this.documentsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<DocumentResponseDto> {
    return this.documentsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateDocumentDto,
    @CurrentUser() user: User
  ): Promise<DocumentResponseDto> {
    return this.documentsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDocumentDto,
    @CurrentUser() user: User
  ): Promise<DocumentResponseDto> {
    return this.documentsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.documentsService.remove(id, user.id);
  }
}
