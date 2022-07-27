import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from 'src/modules/article/article.service';
import { CreateArticleDto } from 'src/modules/article/dto/createArticle.dto';
import { AuthQuard } from 'src/modules/user/guards/auth.quard';
import { User } from 'src/modules/user/decorators/user.decorator';
import { UserEntity } from 'src/modules/user/user.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthQuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<any> {
    return this.articleService.createArticle(currentUser, createArticleDto);
  }
}
