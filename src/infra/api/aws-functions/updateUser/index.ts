import { handlerPath } from '../../helper/handler-resolver';

export const updateUser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'put',
        path: '/user/{id}',
      },
    },
  ],
};
