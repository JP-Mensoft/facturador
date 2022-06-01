import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { DashboardService } from './services/dashboard.service';
import { UserService } from './services/user.service';
import { CustomersService } from './services/customers.service';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { InvoiceFilterPipe } from './pipes/invoice-filter.pipe';
import { InvoicesService } from './services/invoices.service';

@NgModule({
  declarations: [AppComponent, CustomerFilterPipe, InvoiceFilterPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    StorageService,
    DashboardService,
    UserService,
    CustomersService,
    InvoicesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
