import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Url } from 'src/urls/schemas/url.schema';

export type HitDocument = Hit & Document;

@Schema()
export class Hit {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Url' })
  url: Url;

  @Prop({ type: MongooseSchema.Types.Date })
  time: any;
}

export const HitSchema = SchemaFactory.createForClass(Hit);
