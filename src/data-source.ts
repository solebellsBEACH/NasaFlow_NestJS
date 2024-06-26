import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { join } from 'path';

export const DatabaseValues: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
    entities: [User],
    migrations: [join(__dirname, 'src/database/migrations/*.ts')],
    synchronize: false,
}
export const AppDataSource = new DataSource(DatabaseValues);

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
