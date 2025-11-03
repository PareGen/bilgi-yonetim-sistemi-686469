import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Auditlog } from '@saas-template/database';
import type { CreateAuditlogDto, UpdateAuditlogDto } from '@saas-template/core';

@Injectable()
export class AuditlogsRepository extends Repository<Auditlog> {
  constructor(private dataSource: DataSource) {
    super(Auditlog, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Auditlog[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Auditlog | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateAuditlogDto): Promise<Auditlog> {
    const auditlog = this.create({
      ...dto,
      userId,
    });
    return this.save(auditlog);
  }

  async update(id: string, userId: string, dto: UpdateAuditlogDto): Promise<Auditlog | null> {
    const auditlog = await this.findById(id, userId);
    if (!auditlog) {
      return null;
    }

    Object.assign(auditlog, dto);
    return this.save(auditlog);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const auditlog = await this.findById(id, userId);
    if (!auditlog) {
      return false;
    }

    await this.softRemove(auditlog);
    return true;
  }
}
