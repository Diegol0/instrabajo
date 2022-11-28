import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MessageNegotiation,
  MessageNegotiationDocument,
} from 'src/schemas/message-negotiation.schema';

import { MessageNegotiationDTO } from './dto/create-message-negotiation.dto';

@Injectable()
export class MessageNegotiationService {
  constructor(
    @InjectModel(MessageNegotiation.name)
    private readonly messageNegotiationModel: Model<MessageNegotiationDocument>,
  ) {}

  async create(messageNegotiationDto: MessageNegotiationDTO) {
    const createdAddress = await this.messageNegotiationModel.create(
      messageNegotiationDto,
    );
    return createdAddress;
  }

  async findAll() {
    return await this.messageNegotiationModel.find().exec();
  }

  async findOne(id: number) {
    return await this.messageNegotiationModel.findById(id).exec();
  }

  async findByEmployer(employerId: number) {
    return await this.messageNegotiationModel
      .find({ employerId: employerId })
      .exec();
  }

  async findByUser(userId: string) {
    return await this.messageNegotiationModel.find({ userId: userId }).exec();
  }

  async findByToUserAndUnread(userId: string) {
    return await this.messageNegotiationModel
      .find({ toUserId: userId, read: false })
      .exec();
  }

  async findByJobId(jobUserId: string) {
    return await this.messageNegotiationModel
      .find({ jobUserId: jobUserId })
      .exec();
  }

  async readMessageNegotiationsByUserId(jobUserId: string, userId: string) {
    return await this.messageNegotiationModel
      .updateMany(
        { jobUserId: jobUserId, toUserId: userId },
        { $set: { read: true } },
      )
      .exec();
  }

  async update(addressDto: MessageNegotiationDTO) {
    return await this.messageNegotiationModel
      .findOneAndUpdate({ _id: addressDto._id }, addressDto)
      .exec();
  }

  async remove(id: string) {
    return await this.messageNegotiationModel
      .findByIdAndDelete({ _id: id })
      .exec();
  }
}
