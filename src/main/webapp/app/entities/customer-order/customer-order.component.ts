import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerOrder } from 'app/shared/model/customer-order.model';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderDeleteDialogComponent } from './customer-order-delete-dialog.component';

@Component({
  selector: 'jhi-customer-order',
  templateUrl: './customer-order.component.html',
})
export class CustomerOrderComponent implements OnInit, OnDestroy {
  customerOrders?: ICustomerOrder[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerOrderService: CustomerOrderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerOrderService.query().subscribe((res: HttpResponse<ICustomerOrder[]>) => (this.customerOrders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerOrder): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerOrderListModification', () => this.loadAll());
  }

  delete(customerOrder: ICustomerOrder): void {
    const modalRef = this.modalService.open(CustomerOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerOrder = customerOrder;
  }
}
