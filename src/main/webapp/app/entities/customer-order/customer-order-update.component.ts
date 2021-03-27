import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomerOrder, CustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';

@Component({
  selector: 'jhi-customer-order-update',
  templateUrl: './customer-order-update.component.html',
})
export class CustomerOrderUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    orderNumber: [],
    orderStatus: [],
    customerNumber: [],
    legalId: [],
  });

  constructor(protected customerOrderService: CustomerOrderService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerOrder }) => {
      this.updateForm(customerOrder);
    });
  }

  updateForm(customerOrder: ICustomerOrder): void {
    this.editForm.patchValue({
      id: customerOrder.id,
      orderNumber: customerOrder.orderNumber,
      orderStatus: customerOrder.orderStatus,
      customerNumber: customerOrder.customerNumber,
      legalId: customerOrder.legalId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerOrder = this.createFromForm();
    if (customerOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.customerOrderService.update(customerOrder));
    } else {
      this.subscribeToSaveResponse(this.customerOrderService.create(customerOrder));
    }
  }

  private createFromForm(): ICustomerOrder {
    return {
      ...new CustomerOrder(),
      id: this.editForm.get(['id'])!.value,
      orderNumber: this.editForm.get(['orderNumber'])!.value,
      orderStatus: this.editForm.get(['orderStatus'])!.value,
      customerNumber: this.editForm.get(['customerNumber'])!.value,
      legalId: this.editForm.get(['legalId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerOrder>>): void {
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
}
