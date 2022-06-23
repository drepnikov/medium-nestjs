import { Module } from '@nestjs/common';
import { TagController } from 'src/tag/tag.controller';
import { TagService } from 'src/tag/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
