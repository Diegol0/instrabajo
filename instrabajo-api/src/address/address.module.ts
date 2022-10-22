import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressUser, AddressSchema} from 'src/schemas/address-user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AddressUser.name, schema: AddressSchema }])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
