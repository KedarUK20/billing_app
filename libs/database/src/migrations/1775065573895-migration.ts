import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775065573895 implements MigrationInterface {
    name = 'Migration1775065573895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ① Drop FK on orders that references customer_pkey FIRST
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey"`);

        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "customer_pkey"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "customer_username_key"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "customer_email_key"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "address" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "zip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "gst_number" character varying`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // ② Re-add the FK pointing to the new "id" column
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ① Drop FK on orders first
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey"`);

        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "gst_number"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "customer_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "username" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "customer_username_key" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customer_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")`);

        // ② Re-add the old FK pointing back to customer_id
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}