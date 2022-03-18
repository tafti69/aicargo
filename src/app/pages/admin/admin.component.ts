import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrder } from 'src/app/models/orders';
import { Statuses, UpdateStatuses } from 'src/app/models/status';
import { ServicesService } from 'src/app/services.service';
import { Emitters } from 'src/app/models/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  success: boolean = false;
  constructor(
    private service: ServicesService,
  ) {
    Emitters.successDecl.subscribe(data => {
      this.success = data;
    })
  }

  form: FormGroup;

  first = 0;

  rows = 10;

 // totalRecords = 0;

//   next() {
//     this.first = this.first + this.rows;
// }

// prev() {
//     this.first = this.first - this.rows;
// }

// reset() {
//     this.first = 0;
// }

// isLastPage(): boolean {
//     return this.orders ? this.first === (this.orders.length - this.rows): true;
// }

// isFirstPage(): boolean {
//     return this.orders ? this.first === 0 : true;
// }

  orders: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];
  selectedStatusId: any;

  updated = false;

  lang: any;
  isLoading = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      trackingId: new FormControl('', Validators.required),
      personalId: new FormControl('', Validators.required),
    });

    this.getDeliveryTypes();
    this.getStatuses();
    this.getOrders();
    this.getPartners();
    this.getCurrencies();

  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
    });
  }

  getStatuses() {
    this.service.getStatuses(this.lang).subscribe((res) => {
      this.statuses = res;
    });
  }

  getDeliveryTypes() {
    this.service.getDeliveryType(this.lang).subscribe((res) => {
      console.log(res);
      this.deliveries = res;
    });
  }

  onCreateOrder() {
    const form = this.form.value;
    let model = new CreateOrder();

    model.id = form.personalId;
    model.trackingId = form.trackingId;

    this.service.createOrder(model).subscribe((res) => {
      window.location.reload();
    });
  }

  getOrders() {
    this.isLoading = true;
    this.service.getOrder(this.lang).subscribe((res) => {
      console.log(res);
      this.orders = res;
    //  this.totalRecords = res.length;
      this.isLoading = false;
    });
  }

  getPartners() {
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
    });
  }

  onStatusChange(e: Event, id: string) {
    this.selectedStatusId = (e.target as HTMLSelectElement).value;
    let model = new Statuses();

    model.orderId = id;
    model.statusId = this.selectedStatusId;

    console.log(model);

      // this.snackbar.open('Status Updated', '', {
      //   duration: 1000,
      // });
    
    this.service.updateStatus(model).subscribe((res) => {
      console.log(res);
      window.location.reload()
    });
    

  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;

    console.log(model);

    this.service.updateDeliveryType(model).subscribe((res) => {
      console.log(res);
     // this.snackbar.open('Delivery Type Updated');
    });
  }
}
