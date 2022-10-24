import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './.dto/create-user.dto';

import { User, UserDocument } from '../schemas/users.schema';
import { UpdateUserDto } from './.dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    createdUser.password = null;
    return createdUser;
  }

  async findOneAndUpdate(updateUserDTO: UpdateUserDto): Promise<UserDocument> {
    const params = {
      phone: updateUserDTO.phone,
      photo: updateUserDTO.photo,
    };

    for (const prop in params) if (!params[prop]) delete params[prop];
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: updateUserDTO._id }, params)
      .exec();
    updatedUser.password = null;
    return updatedUser;
  }

  async findOneByUserName(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async isUserUnique(createUserDto: CreateUserDto): Promise<boolean> {
    const existUser = await this.userModel
      .exists({
        $or: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      })
      .exec();
    console.log(existUser);
    return existUser?._id == null;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }
}
