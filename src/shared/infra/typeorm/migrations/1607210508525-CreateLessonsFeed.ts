import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLessonsFeed1607210508525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'lessons_feed',
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
              name: 'desc',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'file_url',
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
        'lessons_feed',
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
        'lessons_feed',
        new TableForeignKey({
          name: 'UserLessonFeed',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('lessons_feed', 'LessonLessonFeed');
      await queryRunner.dropForeignKey('lessons_feed', 'UserLessonFeed');

      await queryRunner.dropTable('lessons_feed');
    }

}
