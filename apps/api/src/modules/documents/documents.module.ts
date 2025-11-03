import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentsRepository } from './documents.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    DatabaseModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
  exports: [DocumentsService],
})
export class DocumentsModule {}
