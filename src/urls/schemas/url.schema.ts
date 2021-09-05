import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop()
  complete: string;

  @Prop()
  short: string;

  @Prop({ default: 1 })
  shortenedCount: number;

  //user/owner
}

export const UrlSchema = SchemaFactory.createForClass(Url);
