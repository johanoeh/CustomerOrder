export interface ICustomerOrder {
  id?: number;
  orderNumber?: string;
  orderStatus?: string;
  customerNumber?: string;
  legalId?: string;
}

export class CustomerOrder implements ICustomerOrder {
  constructor(
    public id?: number,
    public orderNumber?: string,
    public orderStatus?: string,
    public customerNumber?: string,
    public legalId?: string
  ) {}
}
