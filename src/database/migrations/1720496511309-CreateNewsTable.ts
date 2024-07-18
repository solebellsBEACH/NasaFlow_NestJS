import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsTable1720496511309 implements MigrationInterface {
  name = 'CreateNewsTable1720496511309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "unique_username" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "content_text" character varying NOT NULL, "img_url" character varying NOT NULL, "read_time" integer NOT NULL, CONSTRAINT "unique_title" UNIQUE ("title"), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
