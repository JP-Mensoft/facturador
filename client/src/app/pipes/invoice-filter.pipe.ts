import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoiceModel';

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(value: InvoiceModel[], arg: string): any[] {
    const filteredInvoices: InvoiceModel[] = [];
    if (arg === "") {
      return value;
    }
    value.forEach((invoice: InvoiceModel) => {
      const invoiceDate: string = invoice.date.toString();
      if (invoiceDate.includes(arg)) {
        filteredInvoices.push(invoice);
      }
    });
    return filteredInvoices;
  }

}
