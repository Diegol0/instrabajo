import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() messageDto: MessageDTO) {
    return this.messageService.create(messageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':userId')
  findByEmployer(@Param('userId') id: string) {
    return this.messageService.findByUser(id);
  }

  @Patch()
  update( @Body() adressDto: MessageDTO) {
    return this.messageService.update( adressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
