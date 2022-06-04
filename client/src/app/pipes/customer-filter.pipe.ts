import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../models/customerModel';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: CustomerModel[], arg: string): CustomerModel[] {
    const filteredCustomers: CustomerModel[] = [];
    if (arg === "") {
      return value;
    }
    if (value === undefined) {
      return [];
    }
    value.forEach((customer: CustomerModel) => {
      const customerName: string = customer.name.toLowerCase();
      if (customerName.includes(arg.toLowerCase())) {
        filteredCustomers.push(customer);
      }
    });
    return filteredCustomers;
  }

}
