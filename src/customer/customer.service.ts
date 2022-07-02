import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { Response } from 'express';
import axios from 'axios';

/*
 * json server is used to mimic a database.
 * axios used to make request to json-server.
 */
@Injectable()
export class CustomerService {
  async createCustomer(
    customer: Customer,
  ): Promise<Response<any, Record<string, any>>> {
    const res = await axios.post('http://localhost:3000/customer/', {
      ...customer,
    });
    return res.data;
  }
  async getBalance(id: string): Promise<Response<any, Record<string, any>>> {
    const res = await axios.get('http://localhost:3000/customer/' + id);
    return res.data.balance;
  }
  async getHistory(id: string): Promise<Response<any, Record<string, any>>> {
    const res = await axios.get('http://localhost:3000/customer/' + id);
    return res.data.history;
  }
  async transferFunds(
    id: string,
    payeeId: string,
    amount: number,
  ): Promise<Response<any, Record<string, any>>> {
    // first will get the details of payer.
    const payerData = await axios.get('http://localhost:3000/customer/' + id);
    if (payerData.data.balance < amount) {
      const erroRes = await axios.get('http://localhost:3000/customer/0');
      return erroRes.data;
    } else {
      // getting payee data.
      const payeeData = await axios.get(
        'http://localhost:3000/customer/' + payeeId,
      );
      // Update payer data.
      const historyArr = payerData.data.history;
      payerData.data.balance = payerData.data.balance - amount;
      historyArr.push(`sent amount ${amount}$ to ${payeeData.data.name}`);
      const updateRes = await axios.patch(
        'http://localhost:3000/customer/' + id,
        {
          ...payerData.data,
          history: historyArr,
        },
      );
      // Update payee data.
      const payeehistoryArr = payeeData.data.history;
      payeeData.data.balance = payeeData.data.balance + amount;
      payeehistoryArr.push(
        `recieved amount ${amount}$ from ${payerData.data.name}`,
      );
      const payeeUpdateRes = await axios.patch(
        'http://localhost:3000/customer/' + payeeId,
        {
          ...payerData.data,
          history: payeehistoryArr,
        },
      );
      const successRes = await axios.get('http://localhost:3000/customer/1');
      return successRes.data;
    }
  }
}
