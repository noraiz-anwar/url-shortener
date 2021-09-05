import { Injectable } from '@nestjs/common';
import { UrlsService } from './urls/urls.service';

@Injectable()
export class AppService {
  constructor(private urlService: UrlsService) {}

  async getRedirectUrl(shortUrl: string): Promise<string> {
    return this.urlService.getCompleteUrl(shortUrl);
  }

  getHealth(): string {
    return 'OK!';
  }
}
