import { PartialType } from '@nestjs/mapped-types';
import { MessageNegotiationDTO } from './create-message-negotiation.dto';

export class UpdateMessageNegotiationDto extends PartialType(
  MessageNegotiationDTO,
) {}
