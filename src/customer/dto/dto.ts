export class CreateCustomerDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly balance: number;
  readonly history: string[];
  // readonly history: string[];
}

export class TransferFundsDto {
  readonly payeeId: string;
  readonly amount: number;
}
