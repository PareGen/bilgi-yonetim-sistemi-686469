import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Document } from './document.entity';
import type { User } from './user.entity';

@Entity({ name: 'audit_logs' })
export class Auditlog extends BaseEntity {
  @Column({ type: 'enum', enum: ['create', 'update', 'delete', 'view'] })
  action!: 'create' | 'update' | 'delete' | 'view';

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_audit_logs_timestamp')
  timestamp!: Date;


@Column({ name: 'document_id' })
  documentId!: string;

  @Index('idx_audit_logs_document_id')
  @ManyToOne('Document', 'auditlogs')
  @JoinColumn({ name: 'document_id' })
  document!: Document;

  @Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_audit_logs_user_id')
  @ManyToOne('User', 'auditlogs')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
