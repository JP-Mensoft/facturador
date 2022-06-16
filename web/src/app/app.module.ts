import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth.service';
import { CustomersService } from './services/customers.service';
import { InvoicesService } from './services/invoices.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

// Pipes
import { CollectedFilterPipe } from './pipes/collected-filter.pipe';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { InvoiceFilterPipe } from './pipes/invoice-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CollectedFilterPipe,
    CustomerFilterPipe,
    InvoiceFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    CustomersService,
    InvoicesService,
    StorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
