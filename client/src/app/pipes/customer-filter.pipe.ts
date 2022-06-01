import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../models/customerModel';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: CustomerModel[], arg: string): any[] {
    const filteredCustomers: CustomerModel[] = [];
    if (arg === "") {
      return value;
    }
    value.forEach((customer: CustomerModel) => {
      const customerName: string = customer.name;
      if (customerName.includes(arg.toLocaleLowerCase())) {
        filteredCustomers.push(customer);
      }
    });
    return filteredCustomers;
  }

}
