import { model } from 'mongoose';
import { UserSchema } from '../schemas/UserSchema';
import mongoose from 'mongoose';

const User = model('users', UserSchema);

export interface UserInfo {
  name: string;
  nickname: string;
  userId: string;
  password: string;
  profile_image?: string;
}

export class UserModel {
  async findByUserId(userId: string) {
    const user = await User.findOne({ userId });
    return user;
  }

  async create(userInfo: UserInfo) {
    const { nickname } = await User.create(userInfo);
    return nickname;
  }

  async update(userId: string, toUpdateInfo: Partial<UserInfo>) {
    const filter = { userId };
    const options = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      toUpdateInfo,
      options
    );

    return {
      name: updatedUser?.name,
      nickname: updatedUser?.nickname,
      userId: updatedUser?.userId,
    };
  }

  async deleteUser(userId: string) {
    const { deletedCount } = await User.deleteOne({ userId });

    return { deletedCount };
  }

  async findById(userId: string) {
    const user = await User.findOne({ userId });
    return user;
  }

  async findUserLike(userId: string, postId: string) {
    const user = await User.findOne({ $and: [{ userId }, { liked: postId }] });
    return user ? true : false;
  }

  async pushPostIdInLikedArray(userId: string, postId: string) {
    const objectPostId = new mongoose.Types.ObjectId(postId);
    const filter = { userId };
    const update = { $push: { liked: objectPostId } };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
