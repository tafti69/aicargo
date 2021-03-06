import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrder } from 'app/models/orders';
import { Statuses, UpdateStatuses } from 'app/models/status';
import { ServicesService } from 'app/services.service';
import { Emitters } from 'app/models/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  success: boolean = false;
  constructor(private service: ServicesService, private snackBar: MatSnackBar) {
    Emitters.successDecl.subscribe((data) => {
      this.success = data;
    });
  }

  form: FormGroup;

  first = 0;

  rows = 5;

  orders: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];
  selectedStatusId: any;

  updated = false;

  lang: any;
  isLoading = false;
  isLoading2 = false;

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
      this.deliveries = res;
    });
  }

  onCreateOrder() {
    const form = this.form.value;
    let model = new CreateOrder();

    model.id = form.personalId;
    model.trackingId = form.trackingId;

    this.isLoading2 = true;

    this.service.createOrder(model).subscribe((res) => {
      this.isLoading2 = false;
      window.location.reload();
    });
  }

  getOrders() {
    this.isLoading = true;
    this.service.getOrder(this.lang).subscribe((res) => {
      this.orders = res;
      this.isLoading = false;
    });
  }

  getPartners() {
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
    });
  }

  onDeleteOrder(id: any) {
    this.service.DeleteOrder(id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  onStatusChange(e: Event, id: string) {
    this.selectedStatusId = (e.target as HTMLSelectElement).value;
    let model = new Statuses();

    model.orderId = id;
    model.statusId = this.selectedStatusId;

    this.snackBar.open('Status Updated', '', {
      duration: 2000,
    });

    this.service.updateStatus(model).subscribe((res) => {});
  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;

    this.snackBar.open('Delivery Updated', '', {
      duration: 2000,
    });

    this.service.updateDeliveryType(model).subscribe((res) => {
      console.log(res);
    });
  }
}
