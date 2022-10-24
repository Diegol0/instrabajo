import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { MessageDTO } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(messageDto: MessageDTO) {
    const createdAddress = await this.messageModel.create(messageDto);
    return createdAddress;
  }

  async findAll() {
    return await this.messageModel.find().exec();
  }

  async findOne(id: number) {
    return await this.messageModel.findById(id).exec();
  }

  async findByEmployer(employerId: number) {
    return await this.messageModel.find({ employerId: employerId }).exec();
  }

  async findByUser(userId: string) {
    //return "UserId"+userId;
    return await this.messageModel.find({ userId: userId }).exec();
  }

  async findByToUserAndUnread(userId: string) {
    //return "UserId"+userId;
    return await this.messageModel.find({ toUserId: userId, read:false }).exec();
  }

  async findByJobId(jobId: string,) {
    //return "UserId"+userId;
    return await this.messageModel.find({ jobId: jobId}).exec();
  }

  async readMessagesByUserId(jobId: string, userId: string) {
    //return "UserId"+userId;
    return await this.messageModel.updateMany({jobId:jobId,toUserId:userId},{$set: {read:true}}).exec;
  }

  async update(addressDto: MessageDTO) {
    return  await this.messageModel
      .findOneAndUpdate({ _id: addressDto._id }, addressDto)
      .exec();
  }

  async remove(id: string) {
    return  await this.messageModel.findByIdAndDelete({_id: id} ).exec();
  }
}
