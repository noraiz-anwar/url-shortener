import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5';

@Injectable()
export class UrlsShortenerService {
  generateShortUrl(url: string): string {
    //   TODO: check url encoding
    const hash = Md5.hashStr(url);
    return Buffer.from(hash).toString('base64').substring(0, 6);
  }
}
