import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from 'src/schemas/review.schema';
import { ReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly AddressModel: Model<ReviewDocument>,
  ) {}

  async create(createAddressDto: ReviewDTO) {
    const createdAddress = await this.AddressModel.create(createAddressDto);
    return createdAddress;
  }

  async findAll() {
    return await this.AddressModel.find().exec();
  }

  async findOne(id: number) {
    return await this.AddressModel.findById(id).exec();
  }

  async findByEmployer(employerId: number) {
    return await this.AddressModel.find({ employerId: employerId }).exec();
  }

  async findByUser(userId: string) {
    //return "UserId"+userId;
    return await this.AddressModel.find({ userId: userId }).exec();
  }

  async update(addressDto: ReviewDTO) {
    return await this.AddressModel.findOneAndUpdate(
      { _id: addressDto._id },
      addressDto,
    ).exec();
  }

  async remove(id: string) {
    return await this.AddressModel.findByIdAndDelete({ _id: id }).exec();
  }
}
