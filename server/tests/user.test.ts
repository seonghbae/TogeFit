import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/user/register', () => {
  let server: any = null;

  beforeAll(() => {
    server = app.listen(5000, () => console.log('Listening on port 5000'));
  });

  afterAll(async () => {
    await server.close();
  });

  describe('이름, 닉네임, 아이디, 패스워드 전송', () => {
    // test('회원가입 성공 시 201 status code를 반환', async () => {
    //   const res: any = await request(app).post('/api/user/register').send({
    //     name: '테스트2',
    //     nickname: 'testUser2',
    //     userId: 'testuser2',
    //     password: '123123',
    //   });
    //   expect(res.status).toBe(201);
    // });

    test('이미 존재하는 유저의 경우 400 status code 반환', async () => {
      const res: any = await request(app).post('/api/user/register').send({
        name: '테스트',
        nickname: 'testUser',
        userId: 'testuser',
        password: '123123',
      });
      expect(res.status).toBe(400);
    });
  });

  describe('이름, 닉네임, 아이디, 패스워드 중 어느 하나라도 빠진 경우', () => {
    test('400 status code를 반환', async () => {
      const bodyData = [
        {
          nickname: 'testUser3',
          userId: 'testuser3',
          password: '123123',
        },
        {
          name: '테스트3',
          userId: 'testuser3',
          password: '123123',
        },
        {
          name: '테스트3',
          nickname: 'testUser3',
          password: '123123',
        },
        {
          name: '테스트3',
          nickname: 'testUser3',
          userId: 'testuser3',
        },
        {},
      ];

      for (const body of bodyData) {
        const res: any = await request(app)
          .post('/api/user/register')
          .send(body);
        expect(res.status).toBe(400);
      }
    });
  });
});
