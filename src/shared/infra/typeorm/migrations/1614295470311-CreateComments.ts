import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateComments1614295470311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'lesson_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'parent_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: true,
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
      'comments',
      new TableForeignKey({
        name: 'LessonLessonFeed',
        columnNames: ['lesson_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lessons',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'UserLessonFeed',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'CommentLessonFeed',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'LessonLessonFeed');
    await queryRunner.dropForeignKey('comments', 'UserLessonFeed');
    await queryRunner.dropForeignKey('comments', 'CommentLessonFeed');

    await queryRunner.dropTable('comments');
  }
}
