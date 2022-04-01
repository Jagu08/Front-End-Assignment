import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  
  public search = new BehaviorSubject<string>("");

  constructor(private db : AngularFirestore) { }
   getProducts(){
    return this.productList.asObservable();
  }

  setProduct(item : any){
    this.cartItemList.localStorage.push(...item);
    this.productList.next(JSON.parse(item));
  }
  addtoCart(item : any){
    this.cartItemList.push(item);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.price;
    })
    return grandTotal;
  }
  removeCartItem(item: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(item.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
  
}
