import { Module } from '@nestjs/common';
import { ResponsePatternPipe } from './pipes/response-pattern/response-pattern.pipe';

@Module({
  imports: [],
  exports: [ResponsePatternPipe],
  providers: [ResponsePatternPipe],
})
export class SharedModule {}
