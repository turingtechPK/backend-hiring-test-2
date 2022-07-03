import { Sequelize } from "sequelize-typescript";
import 'dotenv/config'
import { Accounts } from "./entities/accounts.entity";
import { Users } from "./entities/users.entity";
import { TransactionHistory } from "./entities/trasactionHistory.entity";
export const Connection = [
  {
    
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username:process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        dialect: process.env.DATABASE_TYPE as 'mysql',
        logging: true,
        models: [Users,Accounts,TransactionHistory],
        pool: {
          max: 5,
          min: 0,
          acquire: 60000,
          idle: 10000,
        },
      });
      await sequelize.sync({
        // alter :  true,
        // force : true
      });
      return sequelize;
    },
  },
]
