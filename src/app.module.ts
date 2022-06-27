import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { TagModule } from 'src/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import typeormConfig from 'src/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
