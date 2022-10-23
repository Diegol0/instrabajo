import { PartialType } from '@nestjs/mapped-types';
import { MessageDTO } from './create-message.dto';

export class UpdateMessageDto extends PartialType(MessageDTO) {}
