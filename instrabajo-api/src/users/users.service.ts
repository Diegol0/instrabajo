import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './.dto/create-user.dto';
import { UpdateUserTypeDto } from './.dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';

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

  async findOneAndUpdateType(
    updateUserTypeDTO: UpdateUserTypeDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { _id: updateUserTypeDTO._id },
        { favoriteType: updateUserTypeDTO.type },
        { new: true },
      )
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
}
