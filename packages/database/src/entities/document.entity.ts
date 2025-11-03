import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'documents' })
export class Document extends BaseEntity {
  @Column()
  @Index('idx_documents_title')
  title!: string;

  @Column({ type: 'jsonb' })
  content!: Record<string, unknown>;

  @Column({ type: 'integer' })
  version!: number;


@Column({ name: 'owner_id' })
  ownerId!: string;

  @Index('idx_documents_owner_id')
  @ManyToOne('User', 'documents')
  @JoinColumn({ name: 'owner_id' })
  user!: User;
}
