import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateProfile1705405457283 implements MigrationInterface {
  private readonly tableName: 'ws_profile';

  private readonly columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int4',
      isPrimary: true,
      isGenerated: true,
    },
    {
      name: 'firs_name',
      type: 'varchar',
      length: '100',
    },
    {
      name: 'last_name',
      type: 'varchar',
      length: '100',
    },
    {
      name: 'organization',
      type: 'varchar',
      length: '255',
    },
    {
      name: 'user_id',
      type: 'int4',
      isNullable: false,
      isUnique: true,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      default: 'NOW()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      default: 'NOW()',
    },
  ];

  private readonly foreignKeys: TableForeignKeyOptions[] = [
    {
      name: 'ws_profile_ws_user_fk',
      columnNames: ['user_id'],
      referencedTableName: 'ws_user',
      referencedColumnNames: ['id'],
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: this.columns,
        foreignKeys: this.foreignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
