import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsModule } from './stats/stats.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/shortener'),
    UrlsModule,
    StatsModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
