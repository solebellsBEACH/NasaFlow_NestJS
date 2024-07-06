import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';

// const enviroment = nodeEnviromentVariables()

// export const DatabaseValues: DataSourceOptions = {
//   type: enviroment.DATABASE_TYPE,
//   host: enviroment.DATABASE_HOST,
//   port: enviroment.DATABASE_PORT,
//   username: enviroment.DATABASE_USERNAME,
//   password: enviroment.DATABASE_PASSWORD,
//   database: enviroment.DATABASE_NAME,
//   entities: [User],
//   migrations: ['src/database/migrations/*'],
//   synchronize: false,
// };
export const secretKey = '1234';

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
};
export const AppDataSource = new DataSource(DatabaseValues);

AppDataSource.initialize()
  .then((e) => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
