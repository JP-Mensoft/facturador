import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { DashboardService } from './services/dashboard.service';
import { UserService } from './services/user.service';
import { CustomersService } from './services/customers.service';
import { InvoicesService } from './services/invoices.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
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
