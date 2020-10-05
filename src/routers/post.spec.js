const request = require("supertest");
const app = require('../index');
const check = require('check-types');

describe('POST /post', () => {
  it('should return created post with 201 status', done => {
    request(app)
      .post('/post')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send({ title: 'test', content: 'test' })
      .expect(res => {
        if (res.body.title !== 'test' || res.body.content !== 'test') throw new Error('Invalid response');
      })
      .expect(201, done);
  });
});

describe('POST /post', () => {
  it('should return 401 error', done => {
    request(app)
      .post('/post')
      .set('Authorization', `Bearer fakeKey`)
      .send({ title: 'test', content: 'test' })
      .expect(401, done);
  });
});

describe('POST /post', () => {
  it('should return 400 error with Title required message', done => {
    request(app)
      .post('/post')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send({ title: '', content: 'test' })
      .expect(400, done);
  });
});

describe('GET /posts', () => {
  it('should return array of posts', done => {
    request(app)
      .get('/posts')
      .expect(res => {
        if (!check.array(res.body)) throw new Error('Array expected');
      })
      .expect(200, done);
  });
});

describe('GET /post/:realId', () => {
  it('should return post', done => {
    request(app)
      .get(`/post/${process.env.POST_ID}`)
      .expect(res => {
        const fields = Object.keys(res.body);
        if (!fields.includes('title') || !fields.includes('content')) throw new Error('Invalid response');
      })
      .expect(200, done);
  });
});

describe('GET /post/:fakeId', () => {
  it('should return 400 error', done => {
    request(app)
      .get(`/post/fakeId`)
      .expect(400, done);
  });
});

describe('PATCH /post/:realId', () => {
  it('should return edited post with 200 status', done => {
    request(app)
    .patch(`/post/${process.env.POST_ID}`)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .send({ title: 'edited', content: 'edited' })
    .expect(res => {
      if (res.body.title !== 'edited' || res.body.content !== 'edited') throw new Error('Invalid response');
    })
    .expect(200, done);
  });
});

describe('PATCH /post/:realId', () => {
  it('should return 401 error', done => {
    request(app)
    .patch(`/post/${process.env.POST_ID}`)
    .set('Authorization', `Bearer fakeKey`)
    .send({ title: 'edited', content: 'edited' })
    .expect(401, done);
  });
});