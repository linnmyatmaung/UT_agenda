import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735570531908 implements MigrationInterface {
    name = 'Migration1735570531908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agendas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`time\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`info\` varchar(255) NOT NULL, \`current\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`agendas\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
