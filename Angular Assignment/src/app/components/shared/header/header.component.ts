import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartService } from 'src/app/services/cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  element: any;

  constructor(private db : AngularFirestore,private cartservice : CartService,public firebaseservice : FirebaseService,public orderservice : OrderService) { }

  addProduct(product:any){
    return this.db.collection('Products').add(product)
  }
  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  

}
