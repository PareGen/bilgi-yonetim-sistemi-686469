import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateAuditlogDto, AuditlogResponseDto, UpdateAuditlogDto } from '@saas-template/core';
import type { Auditlog } from '@saas-template/database';
import { AuditlogsRepository } from './auditlogs.repository';

@Injectable()
export class AuditlogsService {
  constructor(
    private readonly auditlogsRepository: AuditlogsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<AuditlogResponseDto[]> {
    const auditlogs = await this.auditlogsRepository.findAll(userId);
    return auditlogs.map((auditlog: Auditlog) => this.toResponseDto(auditlog));
  }

  async findOne(id: string, userId: string): Promise<AuditlogResponseDto> {
    const auditlog = await this.auditlogsRepository.findById(id, userId);
    if (!auditlog) {
      throw new NotFoundException('Auditlog not found');
    }
    return this.toResponseDto(auditlog);
  }

  async create(userId: string, dto: CreateAuditlogDto): Promise<AuditlogResponseDto> {
    return this.uow.execute(async () => {
      const auditlog = await this.auditlogsRepository.create(userId, dto);
      return this.toResponseDto(auditlog);
    });
  }

  async update(id: string, userId: string, dto: UpdateAuditlogDto): Promise<AuditlogResponseDto> {
    return this.uow.execute(async () => {
      const auditlog = await this.auditlogsRepository.update(id, userId, dto);
      if (!auditlog) {
        throw new NotFoundException('Auditlog not found');
      }
      return this.toResponseDto(auditlog);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.auditlogsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Auditlog not found');
      }
    });
  }

  private toResponseDto(auditlog: Auditlog): AuditlogResponseDto {
    return {
      id: auditlog.id,
      documentId: auditlog.documentId,
      action: auditlog.action,
      userId: auditlog.userId,
      timestamp: auditlog.timestamp,
      createdAt: auditlog.createdAt,
      updatedAt: auditlog.updatedAt,
    };
  }
}
