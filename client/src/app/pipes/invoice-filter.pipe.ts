import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoiceModel';

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(value: InvoiceModel[], arg: string): InvoiceModel[] {
    const filteredInvoices: InvoiceModel[] = [];
    if (arg === "") {
      return value;
    }
    if (value === undefined) {
      return [];
    }
    value.forEach((invoice: InvoiceModel) => {
      const invoiceDate: Date = new Date(invoice.date);
      const invoiceDateString: string = invoiceDate.toLocaleDateString();
      if (invoiceDateString.includes(arg)) {
        filteredInvoices.push(invoice);
      }
    });
    return filteredInvoices;
  }

}
