import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775110784194 implements MigrationInterface {
    name = 'Migration1775110784194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "customer_pkey"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "customer_username_key"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "customer_email_key"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "product_pkey"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock_quantity"`);
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
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."product_unittype_enum" AS ENUM('COUNT', 'WEIGHT', 'VOLUME', 'LENGTH')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unitType" "public"."product_unittype_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."product_unit_enum" AS ENUM('PIECE', 'BOX', 'PACK', 'DOZEN', 'KG', 'GRAM', 'LITER', 'ML', 'METER', 'FEET', 'INCH')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unit" "public"."product_unit_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tax" numeric(5,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "hsn_code" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "hsn_code"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unit"`);
        await queryRunner.query(`DROP TYPE "public"."product_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unitType"`);
        await queryRunner.query(`DROP TYPE "public"."product_unittype_enum"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
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
        await queryRunner.query(`ALTER TABLE "product" ADD "stock_quantity" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "customer_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "username" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "customer_username_key" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customer_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")`);
    }

}
