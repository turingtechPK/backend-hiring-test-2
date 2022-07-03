import { TransactionHistory } from "../entities/trasactionHistory.entity";

export const TransactionHistoryProvider = [
    {
      provide: 'TRANSACTION_HISTORY_REPOSITORY',
      useValue: TransactionHistory,
    },
  ];