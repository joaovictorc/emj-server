import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLessons1597333846484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lessons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'subjects_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'class_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'desc',
            type: 'varchar',
          },
          {
            name: 'schedule_time',
            type: 'timestamp with time zone',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'youtube_url',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'lessons',
      new TableForeignKey({
        name: 'SubjectLesson',
        columnNames: ['subjects_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'subjects',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'lessons',
      new TableForeignKey({
        name: 'ClassLesson',
        columnNames: ['class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'class',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lessons', 'SubjectLesson');
    await queryRunner.dropForeignKey('lessons', 'ClassLesson');

    await queryRunner.dropTable('lessons');
  }
}
