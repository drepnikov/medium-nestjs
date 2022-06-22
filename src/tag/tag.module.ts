import { Module } from '@nestjs/common';
import { TagController } from 'src/tag/tag.controller';
import { TagService } from './tag.service';

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
