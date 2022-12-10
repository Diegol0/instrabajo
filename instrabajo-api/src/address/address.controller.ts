import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDTO } from './dto/create-adress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() adressDto: AddressDTO) {
    return this.addressService.create(adressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get('address/:id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Get(':userId')
  findByEmployer(@Param('userId') id: string) {
    return this.addressService.findByUser(id);
  }

  @Patch()
  update(@Body() adressDto: AddressDTO) {
    return this.addressService.update(adressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
