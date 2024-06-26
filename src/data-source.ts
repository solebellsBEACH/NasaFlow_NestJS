import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { join } from 'path';
import { glob } from 'glob';

export const DatabaseValues: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
    entities: [User],
    migrations: ['src/database/migrations/*'],
    synchronize: false,
}
export const AppDataSource = new DataSource(DatabaseValues);

AppDataSource.initialize()
    .then(e => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
