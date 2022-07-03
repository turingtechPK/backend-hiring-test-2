import { Accounts } from "../entities/accounts.entity";


export const AccountsProvider = [
    {
      provide: 'ACCOUNTS_REPOSITORY',
      useValue: Accounts,
    },
  ];