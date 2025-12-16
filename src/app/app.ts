import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Storage } from './auth/components/services/storage/storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rental_car_frontend');

  isCustomerLoggedIn: boolean = Storage.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = Storage.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event.constructor.name ==="NavigationEnd") {
        this.isAdminLoggedIn = Storage.isAdminLoggedIn();
        this.isCustomerLoggedIn = Storage.isCustomerLoggedIn();
      }
    })
  }

  logout() {
    Storage.logout();
    this.router.navigateByUrl("/login");
  }
}
