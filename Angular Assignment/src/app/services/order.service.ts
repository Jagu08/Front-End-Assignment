import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderItemList : any =[]
  public cartItemList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  
  constructor(private firestore : AngularFirestore) { }
  getOrder(){
    return this.cartItemList.asObservable();
  }
  setOrder(item : any){
    this.orderItemList.push(...item);
    this.cartItemList.next(item);
  }
  addtoOrder(item : any){
    this.orderItemList.push(item);
    this.cartItemList.next(this.orderItemList);
    console.log(this.orderItemList)
  }
  placeOrder(item:any){
    return this.firestore.collection('orders').add(item)
  }
}
