import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hit, HitSchema } from './schemas/hit.schema';
import { UrlsModule } from 'src/urls/urls.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hit.name, schema: HitSchema }]),
    UrlsModule,
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
