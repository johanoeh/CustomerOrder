import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';

type EntityResponseType = HttpResponse<ICustomerOrder>;
type EntityArrayResponseType = HttpResponse<ICustomerOrder[]>;

@Injectable({ providedIn: 'root' })
export class CustomerOrderService {
  public resourceUrl = SERVER_API_URL + 'api/customer-orders';

  constructor(protected http: HttpClient) {}

  create(customerOrder: ICustomerOrder): Observable<EntityResponseType> {
    return this.http.post<ICustomerOrder>(this.resourceUrl, customerOrder, { observe: 'response' });
  }

  update(customerOrder: ICustomerOrder): Observable<EntityResponseType> {
    return this.http.put<ICustomerOrder>(this.resourceUrl, customerOrder, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
