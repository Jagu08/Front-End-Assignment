import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public Products : any = [];
  public orders : any = [];
  name: string = '';
  address: string = '';
  pincode: any = '';
  phoneNumber: any = '';
  displayOrderSuccess: boolean = false;
  cartItemList: any;
 
  constructor(private db : AngularFirestore,private orderservice : OrderService,private router : Router,private cartservice : CartService) { 
    this.orders = this.cartservice.cartItemList
  }

  ngOnInit(): void {
  

  }
  placeOrder(){
    if(this.name==''||this.address==''||this.pincode==''||this.phoneNumber==''){
      alert('enter details')
      return
    }
    let item:any ={}
    item['name']=this.name
    item['address']=this.address
    item['pincode']=this.pincode
    item['phoneNumber']=this.phoneNumber
  

    this.orderservice.placeOrder(item)
    this.name=''
    this.address=''
    this.pincode=''
    this.phoneNumber=''
  
  
   this.displayOrderSuccess = true
   console.log(item)

  }
 
  }






