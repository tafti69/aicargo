import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  user;
  cols: any[];

  copy2(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.cols = [
      { header: 'სახელი / Name / Ad:', field: 'Giorgi' },
      { header: 'გვარი / Surname / Soyad:', field: 'Berishvili' },
      { header: 'ტელეფონი / Telephone / Telefon:', field: '05523917530' },
      { header: 'პროვინცია / Province / İl:', field: 'Istambul' },
      { header: 'რაიონი / District / lice:', field: 'Kadikoy' },
      { header: 'სამეზობლო / Neighborhood / mahalle:', field: 'Osmanaga Mah' },
      {
        header: 'მისამართი / Address / adres:',
        field:
          'Osmanağa mah.çuhadarağa sk.Gallerium iş merkezi 23/48 kadiköy istanbul 28001106931',
      },
      {
        header: 'ელ. ფოსტა / E-mail / Email:',
        field: 'ilkin.gojaev@gmail.com',
      },
    ];
  }
}
