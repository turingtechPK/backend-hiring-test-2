import { Module } from "@nestjs/common";
import { AccountsProvider } from "./accounts.provider";
import { TransactionHistoryProvider } from "./transactionHistory.provider";
import { UsersProvider } from "./users.provider";

@Module({
    providers:[
        ...UsersProvider,
        ...AccountsProvider,
        ...TransactionHistoryProvider
    ],
    exports:[
        ...UsersProvider,
        ...AccountsProvider,
        ...TransactionHistoryProvider,
    ]
})
export class ProvidersModule { }
