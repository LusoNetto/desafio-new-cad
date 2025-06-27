import request from 'supertest';
import { app } from '../app';

describe('GET /v1/flights', () => {
  it('should return a list of flights', async () => {
    const response = await request(app).get('/v1/flights');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
