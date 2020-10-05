// const request = require("supertest");
// const app = require('../index');
// const check = require('check-types');

// describe('GET /comments/realId', () => {
//   it('should return array of comments', done => {
//     request(app)
//       .get(`/comments/${process.env.COMMENT_ID}`)
//       .expect(res => {
//         if (!check.array(res.body)) throw new Error('Array expected');
//       })
//       .expect(200, done);
//   });
// });

// describe('GET /comments/fakeId', () => {
//   it('should return error with 404 status', done => {
//     request(app)
//       .get('/comments/111')
//       .expect(404, done);
//   });
// });

// describe('POST /comment', () => {
//   it('should return created comment with 201 status, authorization required', done => {
//     request(app)
//       .post('/comment')
//       .set('Authorization', `Bearer ${process.env.TOKEN}`)
//       .send({ content: 'test', postId: process.env.POST_ID })
//       .expect(res => {
//         if (res.body.content !== 'test') throw new Error('Invalid response');
//       })
//       .expect(201, done);
//   });
// });

// describe('POST /comment', () => {
//   it('should return unauthorized error with 401 status', done => {
//     request(app)
//       .post('/comment')
//       .set('Authorization', 'Bearer fakeKey')
//       .send({ content: 'test', postId: process.env.POST_ID })
//       .expect(401, done);
//   });
// });

// describe('POST /comment', () => {
//   it('should return error with 400 status, authorization required', done => {
//     request(app)
//       .post('/comment')
//       .set('Authorization', `Bearer ${process.env.TOKEN}`)
//       .send({ postId: process.env.POST_ID })
//       .expect(400, done);
//   });
// });

// describe('DELETE /comment/realId', () => {
//   it('should return deleted comment, authorization required', done => {
//     request(app)
//       .delete('/comment/5f773a98230a315be82a101b')
//       .set('Authorization', `Bearer ${process.env.TOKEN}`)
//       .expect(res => {
//         if (!res.body.comment) throw new Error('Invalid response');
//       })
//       .expect(200, done);
//     });
// });

// describe('DELETE /comment/fakeId', () => {
//   it('should return 400 error', done => {
//     request(app)
//       .delete('/comment/fakeId')
//       .set('Authorization', `Bearer ${process.env.TOKEN}`)
//       .expect(400, done);
//   });
// });

// describe('DELETE /comment/realId', () => {
//   it('should return 401 error', done => {
//     request(app)
//       .delete('/comment/5f773a98230a315be82a101b')
//       .set('Authorization', 'Bearer fakeKey')
//       .expect(401, done);
//   });
// });