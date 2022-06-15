import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoiceModel';

@Pipe({
  name: 'collectedFilter'
})
export class CollectedFilterPipe implements PipeTransform {

  transform(value: InvoiceModel[], arg: string): InvoiceModel[] {
    const filteredInvoices: InvoiceModel[] = [];
    let filter: boolean = false;
    if (arg === "") {
      return value;
    }
    if (value === undefined) {
      return [];
    }
    if (arg === "all") {
      return value;
    } else if (arg === "collected") {
      filter = true;
    }
    value.forEach((invoice: InvoiceModel) => {
      const invoiceCollected: boolean = invoice.collected;
      if (invoiceCollected === filter) {
        filteredInvoices.push(invoice);
      }
    });
    return filteredInvoices;
  }

}
