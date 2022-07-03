import { Users } from "../entities/users.entity";


export const UsersProvider = [
    {
      provide: 'USERS_REPOSITORY',
      useValue: Users,
    },
  ];