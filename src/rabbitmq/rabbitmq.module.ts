import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_MQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'stats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class RabbitmqModule {}
