import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditlog } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { AuditlogsController } from './auditlogs.controller';
import { AuditlogsService } from './auditlogs.service';
import { AuditlogsRepository } from './auditlogs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auditlog]),
    DatabaseModule,
  ],
  controllers: [AuditlogsController],
  providers: [AuditlogsService, AuditlogsRepository],
  exports: [AuditlogsService],
})
export class AuditlogsModule {}
