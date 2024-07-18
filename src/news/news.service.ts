import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryNewsDto } from './dto/query-news.dto';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) { }

  create(createNewsDto: CreateNewsDto) {
    const news = new News(createNewsDto);
    return this.newsRepository.save(news);
  }

  async findAll(query: QueryNewsDto) {
    const { page = 1, range = 10 } = query;
    const [data, count] = await this.newsRepository.findAndCount({
      where: { ...query, page: undefined, range: undefined } as any,
      skip: (page - 1) * range,
      take: range,
    });
    return {
      results: data, count, page, range
    }
  }

  findOne(id: string) {
    return this.newsRepository.findOneBy({ id });
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.newsRepository.update(id, updateNewsDto)
  }

  async remove(id: string) {
    return await this.newsRepository.delete(id);
  }
}
