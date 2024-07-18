import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';
import { News } from './news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News]), SharedModule],
  controllers: [NewsController],
  exports: [TypeOrmModule],
  providers: [NewsService],
})
export class NewsModule { }
