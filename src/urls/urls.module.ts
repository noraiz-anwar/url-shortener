import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schemas/url.schema';
import { UrlsShortenerService } from './urls.shortener.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsShortenerService],
  exports: [UrlsService],
})
export class UrlsModule {}
