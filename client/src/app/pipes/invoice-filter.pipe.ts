import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoiceModel';

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(value: any[], arg: string): any[] {
    const filteredInvoices: InvoiceModel[] = [];
    if (arg === "") {
      return value;
    }
    value.forEach((producto: any) => {
      const fechaProducto: string = new Date(producto.fecha).toLocaleDateString();
      const especieProducto: string = producto.especie;
      if (fechaProducto.includes(arg) || especieProducto.toLowerCase().includes(arg.toLowerCase())) {
        filteredInvoices.push(producto);
      }
    });
    return filteredInvoices;
  }
}
