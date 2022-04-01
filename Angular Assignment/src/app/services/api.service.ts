

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  Products: any
  constructor(public db: AngularFirestore) { }

  getProducts(item:any){
    return this.db.collection('Products').add(item)
  }
  
  displayProducts(){
    return this.db.collection('Products').snapshotChanges()
  }

  getOrder(item:any){
    return this.db.collection('Orders').add(item)
  }
  addtoOrder(item : any){
   return  this.db.collection('Orders').add(item);
  }
  displayOrder(){
    return this.db.collection('Orders').snapshotChanges()
  }
  filterBy() {
    this.Products = this.db.collection('Products').valueChanges()
    return this.Products;
   };
  filterByElectronics() {
    this.Products = this.db.collection('Products', ref => ref.where('category','==', 'Electronics' )).valueChanges();
    return this.Products;
  };
  filterByCosmetics() {
    this.Products = this.db.collection('Products', ref => ref.where('category','==', 'Cosmetics' )).valueChanges();
    return this.Products;
  };
  filterByShoes() {
    this.Products = this.db.collection('Products', ref => ref.where('category','==', 'Shoes' )).valueChanges();
    return this.Products;
  };
  filterByManClothes() {
    this.Products = this.db.collection('Products', ref => ref.where('category','==', 'Man Clothes' )).valueChanges();
    return this.Products;
  };
  filterByWomensClothes() {
    this.Products = this.db.collection('Products', ref => ref.where('category','==', 'Women Clothes' )).valueChanges();
    return this.Products;
  };
}
