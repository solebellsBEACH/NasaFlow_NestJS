
import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
export class QueryNewsDto extends PartialType(CreateNewsDto) {
    range?: number;
    page?: number;
}