import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageNegotiationDTO } from './dto/create-message-negotiation.dto';
import { MessageNegotiationService } from './message-negotiation.service';

@Controller('message-negotiation')
export class MessageNegotiationController {
  constructor(
    private readonly messageNegotiationService: MessageNegotiationService,
  ) {}

  @Post()
  create(@Body() messageDto: MessageNegotiationDTO) {
    return this.messageNegotiationService.create(messageDto);
  }

  @Get()
  findAll() {
    return this.messageNegotiationService.findAll();
  }

  @Get('unreadMessageNegotiations/:userId')
  findByEmployer(@Param('userId') id: string) {
    return this.messageNegotiationService.findByToUserAndUnread(id);
  }

  @Get('findByJobUserId/:jobUserId')
  findByJobId(@Param('jobUserId') id: string) {
    return this.messageNegotiationService.findByJobId(id);
  }

  @Get('readMessageNegotiations/:jobUserId/:userId')
  readMessageNegotiations(
    @Param('jobUserId') jobUserId: string,
    @Param('userId') userId: string,
  ) {
    return this.messageNegotiationService.readMessageNegotiationsByUserId(
      jobUserId,
      userId,
    );
  }

  @Patch()
  update(@Body() adressDto: MessageNegotiationDTO) {
    return this.messageNegotiationService.update(adressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageNegotiationService.remove(id);
  }
}
