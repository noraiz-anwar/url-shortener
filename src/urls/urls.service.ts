import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url, UrlDocument } from './schemas/url.schema';
import { UrlsShortenerService } from './urls.shortener.service';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    private urlsShortenerService: UrlsShortenerService,
  ) {}

  async createShortUrl(createUrlDto: CreateUrlDto): Promise<Url> {
    const complete = createUrlDto.url;
    const url = await this.urlModel.findOne({ complete }).exec();

    if (url) {
      url.shortenedCount += 1;
      url.save();
      return url;
    }
    const short = this.urlsShortenerService.generateShortUrl(complete);
    // TODO: consider duplication
    const createdUrl = new this.urlModel({ short, complete });
    return createdUrl.save();
  }

  async getCompleteUrl(short: string) {
    const url = await this.findByShortUrl(short);
    if (url) return url.complete;
    return;
  }

  async findByShortUrl(short: string) {
    return this.urlModel.findOne({ short }).exec();
  }
}
