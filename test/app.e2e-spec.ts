import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/User/User.service';
import { BookshelfService } from '../src/BookShelf/Bookshelf.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: UserService;
  let bookshelfService: BookshelfService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      //providers: [UserService],
    }).compile();
    service = moduleFixture.get<UserService>(UserService);
    bookshelfService = moduleFixture.get<BookshelfService>(BookshelfService);
    // app = moduleFixture.createNestApplication();
    // await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
  it('Login User', async() => {
    const actualLogin = await service.login("abdusman","myPass");
    expect(actualLogin).toBe(null);
  });
});
