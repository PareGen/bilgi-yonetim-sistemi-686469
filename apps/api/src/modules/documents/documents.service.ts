import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateDocumentDto, DocumentResponseDto, UpdateDocumentDto } from '@saas-template/core';
import type { Document } from '@saas-template/database';
import { DocumentsRepository } from './documents.repository';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<DocumentResponseDto[]> {
    const documents = await this.documentsRepository.findAll(userId);
    return documents.map((document: Document) => this.toResponseDto(document));
  }

  async findOne(id: string, userId: string): Promise<DocumentResponseDto> {
    const document = await this.documentsRepository.findById(id, userId);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return this.toResponseDto(document);
  }

  async create(userId: string, dto: CreateDocumentDto): Promise<DocumentResponseDto> {
    return this.uow.execute(async () => {
      const document = await this.documentsRepository.create(userId, dto);
      return this.toResponseDto(document);
    });
  }

  async update(id: string, userId: string, dto: UpdateDocumentDto): Promise<DocumentResponseDto> {
    return this.uow.execute(async () => {
      const document = await this.documentsRepository.update(id, userId, dto);
      if (!document) {
        throw new NotFoundException('Document not found');
      }
      return this.toResponseDto(document);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.documentsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Document not found');
      }
    });
  }

  private toResponseDto(document: Document): DocumentResponseDto {
    return {
      id: document.id,
      title: document.title,
      content: document.content,
      version: document.version,
      ownerId: document.ownerId,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
