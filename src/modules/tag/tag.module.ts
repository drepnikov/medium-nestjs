import { Module } from '@nestjs/common';
import { TagController } from 'src/modules/tag/tag.controller';
import { TagService } from 'src/modules/tag/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/modules/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
