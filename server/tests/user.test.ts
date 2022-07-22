import * as db from './utils/db';
import { userService } from '../src/services';

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());

describe('회원가입 TEST', () => {
  test('회원가입 성공', async () => {
    const user = await userService.addUser({
      name: 'jest1',
      nickname: 'jesthard',
      userId: 'jest1',
      password: '1234',
    });

    expect(user).toEqual('jesthard');
  });

  test('회원가입 실패 - 중복 id', async () => {
    await expect(
      userService.addUser({
        name: 'jest1',
        nickname: 'jesthard',
        userId: 'jest1',
        password: '1234',
      })
    ).rejects.toThrow(
      '이 아이디는 현재 사용중입니다. 다른 아이디를 입력해주세요.'
    );
  });
});

describe('로그인 TEST', () => {
  test('로그인 성공', async () => {
    const userToken = await userService.getUserToken({
      userId: 'jest1',
      password: '1234',
    });

    expect(userToken).not.toBeNull();
  });

  test('로그인 실패 - 존재하지 않는 유저', async () => {
    await expect(
      userService.getUserToken({
        userId: 'jest123',
        password: '1234',
      })
    ).rejects.toThrow('해당 유저를 찾지 못했습니다.');
  });

  test('로그인 실패 - 비밀번호 불일치', async () => {
    await expect(
      userService.getUserToken({
        userId: 'jest1',
        password: '1',
      })
    ).rejects.toThrow('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
  });
});

describe('회원 정보 수정 TEST', () => {
  test('회원 정보 수정 실패 - 존재하지 않는 유저', async () => {
    const requiredInfo = { userId: 'jest12345', currentPassword: '1234' };
    const toUpdateInfo = {
      name: 'jest2',
      nickname: 'jest2',
      password: '123456',
    };

    await expect(
      userService.patchUser(requiredInfo, toUpdateInfo)
    ).rejects.toThrow('해당 유저를 찾지 못했습니다.');
  });

  test('회원 정보 수정 실패 - 비밀번호 불일치', async () => {
    const requiredInfo = { userId: 'jest1', currentPassword: '123456789' };
    const toUpdateInfo = {
      name: 'jest3',
      nickname: 'jest3',
      password: '123456',
    };

    await expect(
      userService.patchUser(requiredInfo, toUpdateInfo)
    ).rejects.toThrow('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
  });

  test('회원 정보 수정 성공', async () => {
    const requiredInfo = { userId: 'jest1', currentPassword: '1234' };
    const toUpdateInfo = {
      name: 'jest2',
      nickname: 'jest2',
      password: '123456',
      profile_image: 'test.png',
    };
    const updatedUserInfo = await userService.patchUser(
      requiredInfo,
      toUpdateInfo
    );

    expect({
      ...(toUpdateInfo.name && { name: updatedUserInfo?.name }),
      ...(toUpdateInfo.nickname && { nickname: updatedUserInfo?.nickname }),
      ...(toUpdateInfo.password && { password: updatedUserInfo?.password }),
      ...(toUpdateInfo.profile_image && {
        profile_image: updatedUserInfo?.profile_image,
      }),
    }).toEqual(toUpdateInfo); //toUpdateInfo의 password는 userService에서 알아서 hash됨.
  });
});

describe('회원 탈퇴 TEST', () => {
  test('회원 탈퇴 실패 - 비밀번호 불일치', async () => {
    const userId = 'jest1';
    const password = '1234';

    await expect(userService.deleteUser(userId, password)).rejects.toThrow(
      '비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.'
    );
  });

  test('회원 탈퇴 성공', async () => {
    const userId = 'jest1';
    const password = '123456';
    const result = await userService.deleteUser(userId, password);

    expect(result).toEqual({ deletedCount: 1 });
  });
});

describe('유저 정보 가져오기 TEST', () => {
  (async function () {
    const input = [
      {
        name: 'jest1',
        nickname: 'jest1',
        userId: 'jest1',
        password: '1234',
      },
      {
        name: 'jest2',
        nickname: 'jest2',
        userId: 'jest2',
        password: '1234',
      },
      {
        name: 'jest3',
        nickname: 'jest3',
        userId: 'jest3',
        password: '1234',
      },
      {
        name: 'jest4',
        nickname: 'jest4',
        userId: 'jest4',
        password: '1234',
      },
      {
        name: 'jest5',
        nickname: 'jest5',
        userId: 'jest5',
        password: '1234',
      },
    ];

    for (const person of input) {
      await userService.addUser(person);
    }
  })();

  test('가져오기 성공', async () => {
    for (let i = 1; i <= 5; i++) {
      await expect(
        userService.findByUserId(`jest${i}`)
      ).resolves.not.toBeNull();
    }
  });

  test('가져오기 실패 - 잘못된 유저 id', async () => {
    await expect(userService.findByUserId('jest777')).rejects.toThrow(
      '해당 유저를 찾지 못했습니다.'
    );
  });
});
