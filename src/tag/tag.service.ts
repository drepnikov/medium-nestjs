import { Injectable } from '@nestjs/common';
import { TagEntity } from 'src/tag/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity) private tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return this.tagRepository.find();
  }
}
