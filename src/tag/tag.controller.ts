import { Controller, Get } from '@nestjs/common';
import { TagService } from 'src/tag/tag.service';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll(): string[] {
    return this.tagService.findAll();
  }
}