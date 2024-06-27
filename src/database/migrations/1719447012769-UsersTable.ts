import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1719447012769 implements MigrationInterface {
    name = 'UsersTable1719447012769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "unique_username" UNIQUE ("username"), CONSTRAINT "unique_password" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
