import request from 'supertest';
import { app } from '../app';

describe('Swagger Docs', () => {
  it('should serve the Swagger UI', async () => {
    const response = await request(app).get('/docs');
    // Swagger UI returns HTML
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
