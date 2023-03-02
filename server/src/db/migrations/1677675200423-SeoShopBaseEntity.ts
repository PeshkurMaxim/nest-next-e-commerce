import { MigrationInterface, QueryRunner } from "typeorm";

export class SeoShopBaseEntity1677675200423 implements MigrationInterface {
    name = 'SeoShopBaseEntity1677675200423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "path" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "h1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "keywords" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "keywords"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "h1"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "path"`);
    }

}
