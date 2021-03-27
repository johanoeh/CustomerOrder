import { IOrderItem } from 'app/shared/model/order-item.model';

export interface ICustomerOrder {
  id?: number;
  orderNumber?: string;
  orderStatus?: string;
  customerNumber?: string;
  legalId?: string;
  orderItems?: IOrderItem[];
}

export class CustomerOrder implements ICustomerOrder {
  constructor(
    public id?: number,
    public orderNumber?: string,
    public orderStatus?: string,
    public customerNumber?: string,
    public legalId?: string,
    public orderItems?: IOrderItem[]
  ) {}
}
