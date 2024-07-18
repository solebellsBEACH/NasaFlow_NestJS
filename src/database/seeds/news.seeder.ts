import { News } from '@news/news.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class NewsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const newsFactory = await factoryManager.get(News);
    await newsFactory.saveMany(40);
  }
}
