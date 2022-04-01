import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
 

  public orders : any = [];
  constructor(private cartservice : CartService,private db: AngularFirestore,private apiservice : ApiService,private firebaseservice : FirebaseService,private router : Router) {
   
   
  }

  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.orders = res;
 })
  }
}

    
