import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../models/customerModel';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any[], arg: string): any[] {
    const filteredCustomers: CustomerModel[] = [];
    if (arg === "") {
      return value;
    }
    value.forEach((producto: any) => {
      const fechaProducto: string = new Date(producto.fecha).toLocaleDateString();
      const especieProducto: string = producto.especie;
      if (fechaProducto.includes(arg) || especieProducto.toLowerCase().includes(arg.toLowerCase())) {
        filteredCustomers.push(producto);
      }
    });
    return filteredCustomers;
  }

}
