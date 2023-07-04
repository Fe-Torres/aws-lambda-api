import { handlerPath } from '../../helper/handler-resolver';

export const deleteUserById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'delete',
        path: '/user/{id}',
      },
    },
  ],
};
