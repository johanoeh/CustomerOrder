import { ICustomerOrder } from 'app/shared/model/customer-order.model';

export interface IOrderItem {
  id?: number;
  procuctName?: string;
  productId?: string;
  amount?: number;
  price?: string;
  customerOrder?: ICustomerOrder;
}

export class OrderItem implements IOrderItem {
  constructor(
    public id?: number,
    public procuctName?: string,
    public productId?: string,
    public amount?: number,
    public price?: string,
    public customerOrder?: ICustomerOrder
  ) {}
}
