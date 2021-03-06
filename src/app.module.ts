import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { TagModule } from 'src/modules/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import typeormConfig from 'src/ormconfig';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { ArticleModule } from 'src/modules/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TagModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
