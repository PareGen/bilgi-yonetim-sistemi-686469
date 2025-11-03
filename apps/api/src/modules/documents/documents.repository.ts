import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Document } from '@saas-template/database';
import type { CreateDocumentDto, UpdateDocumentDto } from '@saas-template/core';

@Injectable()
export class DocumentsRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Document[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Document | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateDocumentDto): Promise<Document> {
    const document = this.create({
      ...dto,
      userId,
    });
    return this.save(document);
  }

  async update(id: string, userId: string, dto: UpdateDocumentDto): Promise<Document | null> {
    const document = await this.findById(id, userId);
    if (!document) {
      return null;
    }

    Object.assign(document, dto);
    return this.save(document);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const document = await this.findById(id, userId);
    if (!document) {
      return false;
    }

    await this.softRemove(document);
    return true;
  }
}
