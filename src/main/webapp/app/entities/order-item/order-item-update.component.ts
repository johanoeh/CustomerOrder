import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrderItem, OrderItem } from 'app/shared/model/order-item.model';
import { OrderItemService } from './order-item.service';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from 'app/entities/customer-order/customer-order.service';

@Component({
  selector: 'jhi-order-item-update',
  templateUrl: './order-item-update.component.html',
})
export class OrderItemUpdateComponent implements OnInit {
  isSaving = false;
  customerorders: ICustomerOrder[] = [];

  editForm = this.fb.group({
    id: [],
    procuctName: [],
    productId: [],
    amount: [],
    price: [],
    customerOrder: [],
  });

  constructor(
    protected orderItemService: OrderItemService,
    protected customerOrderService: CustomerOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderItem }) => {
      this.updateForm(orderItem);

      this.customerOrderService.query().subscribe((res: HttpResponse<ICustomerOrder[]>) => (this.customerorders = res.body || []));
    });
  }

  updateForm(orderItem: IOrderItem): void {
    this.editForm.patchValue({
      id: orderItem.id,
      procuctName: orderItem.procuctName,
      productId: orderItem.productId,
      amount: orderItem.amount,
      price: orderItem.price,
      customerOrder: orderItem.customerOrder,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderItem = this.createFromForm();
    if (orderItem.id !== undefined) {
      this.subscribeToSaveResponse(this.orderItemService.update(orderItem));
    } else {
      this.subscribeToSaveResponse(this.orderItemService.create(orderItem));
    }
  }

  private createFromForm(): IOrderItem {
    return {
      ...new OrderItem(),
      id: this.editForm.get(['id'])!.value,
      procuctName: this.editForm.get(['procuctName'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      price: this.editForm.get(['price'])!.value,
      customerOrder: this.editForm.get(['customerOrder'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomerOrder): any {
    return item.id;
  }
}
