import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ResponseActions } from '@shared/interfaces/response-type.interfaces';
import { ResponsePatternService } from '@shared/services/response-pattern/response-pattern.service';

@Controller('news')
export class NewsController {
  private _entityName = 'news';
  constructor(private readonly newsService: NewsService, private readonly _responsePatternService: ResponsePatternService) { }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    const response = this.newsService.create(createNewsDto);
    return this._responsePatternService.getResponse(
      response,
      this._entityName,
      ResponseActions.create,
    );
  }

  @Get()
  findAll() {
    return this._responsePatternService.getResponse(
      this.newsService.findAll(),
      this._entityName,
      ResponseActions.getAll,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._responsePatternService.getResponse(
      this.newsService.findOne(id),
      this._entityName,
      ResponseActions.get,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    const response = this.newsService.update(id, updateNewsDto);
    return this._responsePatternService.getResponse(
      response,
      this._entityName,
      ResponseActions.update,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const response = this.newsService.remove(id);
    return this._responsePatternService.getResponse(
      response,
      this._entityName,
      ResponseActions.delete,
    );
  }
}
