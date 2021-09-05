import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlsService } from 'src/urls/urls.service';
import { Hit, HitDocument } from './schemas/hit.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Hit.name) private hitModel: Model<HitDocument>,
    private urlService: UrlsService,
  ) {}

  async recordHit(hit: any) {
    const url = await this.urlService.findByShortUrl(hit.shortUrl);
    const hitEntity = await this.hitModel.create({
      url,
      time: hit.time,
    });
    hitEntity.save();
  }

  async getStats() {
    const aggregatorOpts = [
      {
        $group: {
          _id: '$url',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'urls',
          localField: '_id',
          foreignField: '_id',
          as: 'url',
        },
      },
      { $unwind: { path: '$url' } },
      {
        $project: {
          short: '$url.short',
          complete: '$url.complete',
          count: 1,
          _id: 0,
        },
      },
    ];

    return this.hitModel.aggregate(aggregatorOpts);
  }
}
