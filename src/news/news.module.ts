import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), SharedModule],
  controllers: [NewsController],
  exports: [TypeOrmModule],
  providers: [NewsService],
})
export class NewsModule { }
