import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateDocumentTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'owner_id',
            type: 'uuid',
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
      'documents',
      new TableForeignKey({
        name: 'fk_documents_owner_id',
        columnNames: ['owner_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'idx_documents_title',
        columnNames: ['title'],
      })
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'idx_documents_owner_id',
        columnNames: ['owner_id'],
      })
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'idx_documents_owner_id',
        columnNames: ['owner_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('documents', 'idx_documents_title');
    await queryRunner.dropIndex('documents', 'idx_documents_owner_id');
    await queryRunner.dropForeignKey('documents', 'fk_documents_owner_id');
    await queryRunner.dropTable('documents');
  }
}
