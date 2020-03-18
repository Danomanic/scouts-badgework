const request = require('supertest');

describe('Post Endpoints', () => {
  let server;

  beforeEach(function () {
    server = require('../src/index.js');
  });
  afterEach(function () {
    server.close();
  });

  it('Should login', (done) => {
    request(server)
      .post('/login')
      .send('name=john&section=1')
      .set('Accept', 'application/json')
      .expect(201, done)
  })
})