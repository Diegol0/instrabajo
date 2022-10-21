import { PartialType } from '@nestjs/mapped-types';
import { AddressDTO } from './create-adress.dto';

export class UpdateAddressDto extends PartialType(AddressDTO) {}
