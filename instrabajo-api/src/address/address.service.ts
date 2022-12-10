import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddressUser,
  AddressUserDocument,
} from 'src/schemas/address-user.schema';
import { AddressDTO } from './dto/create-adress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(AddressUser.name)
    private readonly AddressModel: Model<AddressUserDocument>,
  ) {}

  async create(createAddressDto: AddressDTO) {
    const createdAddress = await this.AddressModel.create(createAddressDto);
    return createdAddress;
  }

  async findAll() {
    return await this.AddressModel.find().exec();
  }

  async findOne(id: string) {
    return await this.AddressModel.findById(id).exec();
  }

  async findByEmployer(employerId: number) {
    return await this.AddressModel.find({ employerId: employerId }).exec();
  }

  async findByUser(userId: string) {
    //return "UserId"+userId;
    return await this.AddressModel.find({ userId: userId }).exec();
  }

  async update(addressDto: AddressDTO) {
    return await this.AddressModel.findOneAndUpdate(
      { _id: addressDto._id },
      addressDto,
    ).exec();
  }

  async remove(id: string) {
    return await this.AddressModel.findByIdAndDelete({ _id: id }).exec();
  }
}
