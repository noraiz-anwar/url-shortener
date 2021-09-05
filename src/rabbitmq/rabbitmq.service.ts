import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('RABBIT_MQ_CLIENT') private readonly rabbitMQClient: ClientProxy,
  ) {}

  async emit(pattern: string, message: any): Promise<any> {
    return this.rabbitMQClient.emit(pattern, message);
  }
}
