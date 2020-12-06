import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSubjectsIdToLessonsFeed1607216670360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.addColumn(
        'lessons_feed',
        new TableColumn({
          name: 'subject_id',
          type: 'uuid',
          isNullable: true,
        },),
      );

      await queryRunner.createForeignKey(
        'lessons_feed',
        new TableForeignKey({
          name: 'SubjectLessonFeed',
          columnNames: ['subject_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'subjects',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('lessons_feed', 'SubjectLessonFeed');

      await queryRunner.dropColumn('lessons_feed', 'subject_id');
    }
}
