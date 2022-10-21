import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from 'src/schemas/address.schema';
import { AddressDTO } from './dto/create-adress.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private readonly jobModel: Model<AddressDocument>,
  ) {}

  async create(createJobDto: AddressDTO) {
    const createdJob = await this.jobModel.create(createJobDto);
    return createdJob;
  }

  async findAll() {
    return await this.jobModel.find().exec();
  }

  async findOne(id: number) {
    return await this.jobModel.findById(id).exec();
  }

  async findByEmployer(employerId: number) {
    return await this.jobModel.find({ employerId: employerId }).exec();
  }

  update(id: number, updateJobDto: UpdateAddressDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
