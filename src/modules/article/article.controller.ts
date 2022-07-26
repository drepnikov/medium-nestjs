import { Controller, Post } from '@nestjs/common';
import { ArticleService } from 'src/modules/article/article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  async create() {
    return this.articleService.createArticle();
  }
}
