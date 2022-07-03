import { Module } from "@nestjs/common";
import { Connection } from "./connection";
import { ConfigModule } from '@nestjs/config';
@Module({
    providers: [...Connection],
    exports: [...Connection,
      
  ],
    imports: [
          ConfigModule.forRoot({
    isGlobal: true,
    envFilePath : '.env'
  }),
    ]
  })
  export class DBModule {
    constructor(){
      console.log("logs for the server ",process.env.DATABASE_TYPE);
      
    }
  }
  