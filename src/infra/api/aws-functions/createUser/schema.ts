export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'int' },
    email: { type: 'string' },
  },
  required: [ 'name', 'email', 'age' ],
} as const;
