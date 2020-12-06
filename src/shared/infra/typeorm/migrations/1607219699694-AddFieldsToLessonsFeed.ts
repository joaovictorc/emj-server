import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from 'typeorm';

export class AddFieldsToLessonsFeed1607219699694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'lessons_feed',
        new TableColumn({
          name: 'file_type',
          type: 'varchar',
          isNullable: true,
        },),
      );

      await queryRunner.addColumn(
        'lessons_feed',
        new TableColumn({
          name: 'file_name',
          type: 'varchar',
          isNullable: true,
        },),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('lessons_feed', 'file_type');
      await queryRunner.dropColumn('lessons_feed', 'file_name');
    }
}
