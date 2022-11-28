import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MessageNegotiation,
  MessageNegotiationSchema,
} from 'src/schemas/message-negotiation.schema';
import { MessageNegotiationController } from './message-negotiation.controller';
import { MessageNegotiationService } from './message-negotiation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessageNegotiation.name, schema: MessageNegotiationSchema },
    ]),
  ],
  controllers: [MessageNegotiationController],
  providers: [MessageNegotiationService],
})
export class MessageNegotiationModule {}
