import { ResponsePatternService } from './services/response-pattern/response-pattern.service';
import { Module } from '@nestjs/common';
import { ResponsePatternPipe } from './pipes/response-pattern/response-pattern.pipe';

@Module({
  imports: [],
  exports: [ResponsePatternPipe, ResponsePatternService],
  providers: [ResponsePatternPipe, ResponsePatternService],
})
export class SharedModule {}
