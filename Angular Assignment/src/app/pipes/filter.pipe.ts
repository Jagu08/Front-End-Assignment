import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(Products: any[], searchText: string): any[] {
    if(!Products) return [];
    if(!searchText) return Products;
searchText = searchText.toLowerCase();
return Products.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }
}

