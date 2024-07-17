import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.newsRepository.find();
  }

  findOne(id: string) {
    return this.newsRepository.findOneBy({ id });
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  async remove(id: string) {
    return await this.newsRepository.delete(id);
  }
}
