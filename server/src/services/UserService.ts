import { userModel, UserModel, UserInfo } from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface RequiredInfo {
  userId: string;
  currentPassword: string;
}
interface LoginInfo {
  userId: string;
  password: string;
}

class UserService {
  constructor(private userModel: UserModel) {}

  async findByUserId(userId: string) {
    const user = await this.userModel.findByUserId(userId);

    return user;
  }

  // 유저 정보 등록
  async addUser(userInfo: UserInfo) {
    const { name, nickname, userId, password } = userInfo;

    // 아이디 중복검사
    const user = await this.userModel.findByUserId(userId);
    if (user) {
      throw new Error(
        '이 아이디는 현재 사용중입니다. 다른 아이디를 입력해주세요.'
      );
    }

    // 중복 x -> 회원가입
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      name,
      nickname,
      userId,
      password: hashedPassword,
    };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 유저 정보 수정
  async patchUser(requiredInfo: RequiredInfo, toUpdateInfo: Partial<UserInfo>) {
    const { userId, currentPassword } = requiredInfo;

    const user = await this.userModel.findByUserId(userId);

    if (!user) {
      throw new Error('해당 사용자를 찾을 수 없습니다.');
    }

    // 비밀번호 확인
    const correctPasswordHash = user.password;
    const isCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
    }

    // 업데이트
    // 패스워드는 해싱 후 전달해야함.
    const { password } = toUpdateInfo;

    if (password) {
      const newPasswordHashed = await bcrypt.hash(password, 10);
      toUpdateInfo.password = newPasswordHashed;
    }

    const updatedUser = await this.userModel.update(userId, toUpdateInfo);

    return updatedUser;
  }

  // 유저 정보 삭제
  async deleteUser(userId: string, password: string) {
    const user = await this.userModel.findByUserId(userId);

    if (!user) {
      throw new Error('해당 사용자를 찾을 수 없습니다.');
    }

    // 비밀번호 확인
    const correctPasswordHash = user.password;
    const isCorrect = await bcrypt.compare(password, correctPasswordHash);

    // 불일치
    if (!isCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
    }

    const result = await this.userModel.deleteUser(userId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }
  async getUserToken(loginInfo: LoginInfo) {
    const { userId, password } = loginInfo;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('해당 아이디는 가입 내역이 없습니다.');
    }

    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    const token = jwt.sign({ userId }, secretKey);
    console.log(token);

    return { token, userId };
  }
}
const userService = new UserService(userModel);

export { userService };
