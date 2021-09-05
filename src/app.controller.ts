import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Redirect,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { StatsService } from './stats/stats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private rabbitmqService: RabbitmqService,
    private statsService: StatsService,
  ) {}

  @Redirect()
  @Get(':shortUrl/')
  async redirect(@Param('shortUrl') shortUrl: string) {
    const url = await this.appService.getRedirectUrl(shortUrl);
    if (!url) throw new NotFoundException();
    this.rabbitmqService.emit('url-hit', { shortUrl, time: new Date() });
    return { url };
  }

  @MessagePattern('url-hit')
  getNotifications(@Payload() payload: any) {
    this.statsService.recordHit(payload);
  }
}
