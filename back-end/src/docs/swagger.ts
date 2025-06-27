export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Flights & Bookmarks API',
    version: '1.0.0',
  },
  paths: {
    '/api/v1/flights': {
      get: {
        summary: 'Get all flights',
        responses: {
          200: {
            description: 'List of flights',
          },
        },
      },
    },
    '/api/v1/bookmarks': {
      get: {
        summary: 'Get all bookmarks',
        responses: {
          200: {
            description: 'Object with array of bookmarked flight IDs',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    flightIds: {
                      type: 'array',
                      items: { type: 'number' },
                      description: 'Array of bookmarked flight IDs',
                    },
                  },
                  required: ['flightIds'],
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a bookmark',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { flightId: { type: 'number' } }, required: ['flightId'] },
            },
          },
        },
        responses: { 201: { description: 'Bookmark created' }, 409: { description: 'Already exists' } },
      },
    },
    '/api/v1/bookmarks/{flightId}': {
      delete: {
        summary: 'Delete a bookmark',
        parameters: [
          { name: 'flightId', in: 'path', required: true, schema: { type: 'number' } },
        ],
        responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } },
      },
    },
  },
};
