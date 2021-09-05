import { Controller, Post, Body } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('api/urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.createShortUrl(createUrlDto);
  }
}
