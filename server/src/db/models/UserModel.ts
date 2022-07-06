import { model } from 'mongoose';
import { UserSchema } from '../schemas/UserSchema';

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
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async update(userId: string, toUpdateInfo: Partial<UserInfo>) {
    const filter = { userId };
    const options = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      toUpdateInfo,
      options
    );

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const { deletedCount } = await User.deleteOne({ userId });

    return { deletedCount };
  }
}

const userModel = new UserModel();

export { userModel };
