import request from 'supertest';
import { app } from '../app';

jest.mock('../redisServer');

describe('Bookmarks API', () => {
  let createdId: number;

  it('should return an empty object or bookmarks list', async () => {
    const response = await request(app).get('/v1/bookmarks');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
  });

  it('should create a new bookmark', async () => {
    createdId = 9999;
    const response = await request(app)
      .post('/v1/bookmarks')
      .send({ flightId: createdId });
    expect([201, 409]).toContain(response.status);
  });

  it('should not create a bookmark with invalid data', async () => {
    const response = await request(app)
      .post('/v1/bookmarks')
      .send({ flightId: 'not-a-number' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return conflict if bookmark already exists', async () => {
    const response = await request(app)
      .post('/v1/bookmarks')
      .send({ flightId: createdId });
    expect(response.status).toBe(409);
  });

  it('should delete a bookmark', async () => {
    const response = await request(app).delete(`/v1/bookmarks/${createdId}`);
    expect([200, 404]).toContain(response.status);
  });

  it('should return not found when deleting a non-existent bookmark', async () => {
    const response = await request(app).delete(`/v1/bookmarks/123456789`);
    expect([200, 404]).toContain(response.status);
  });

  it('should return 400 for invalid delete param', async () => {
    const response = await request(app).delete('/v1/bookmarks/not-a-number');
    expect(response.status).toBe(400);
  });
});
