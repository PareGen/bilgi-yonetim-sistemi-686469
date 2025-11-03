import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateAuditlogTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'audit_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'document_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'enum',
            enum: ['create', 'update', 'delete', 'view'],
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'timestamp',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'audit_logs',
      new TableForeignKey({
        name: 'fk_audit_logs_document_id',
        columnNames: ['document_id'],
        referencedTableName: 'documents',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'audit_logs',
      new TableForeignKey({
        name: 'fk_audit_logs_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'audit_logs',
      new TableIndex({
        name: 'idx_audit_logs_document_id',
        columnNames: ['document_id'],
      })
    );

    await queryRunner.createIndex(
      'audit_logs',
      new TableIndex({
        name: 'idx_audit_logs_document_id',
        columnNames: ['document_id'],
      })
    );

    await queryRunner.createIndex(
      'audit_logs',
      new TableIndex({
        name: 'idx_audit_logs_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'audit_logs',
      new TableIndex({
        name: 'idx_audit_logs_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'audit_logs',
      new TableIndex({
        name: 'idx_audit_logs_timestamp',
        columnNames: ['timestamp'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('audit_logs', 'idx_audit_logs_document_id');
    await queryRunner.dropIndex('audit_logs', 'idx_audit_logs_user_id');
    await queryRunner.dropIndex('audit_logs', 'idx_audit_logs_timestamp');
    await queryRunner.dropForeignKey('audit_logs', 'fk_audit_logs_document_id');
    await queryRunner.dropForeignKey('audit_logs', 'fk_audit_logs_user_id');
    await queryRunner.dropTable('audit_logs');
  }
}
