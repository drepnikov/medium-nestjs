import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';
import { CreateArticleDto } from 'src/modules/article/dto/createArticle.dto';
import { ArticleEntity } from 'src/modules/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const newArticle = new ArticleEntity();

    Object.assign(newArticle, createArticleDto);

    if (!newArticle.tagList) newArticle.tagList = [];

    newArticle.author = currentUser;

    return this.articleRepository.save(newArticle);
  }
}
