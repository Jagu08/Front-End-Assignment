import { Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 
  public Products : any = [];
  public grandTotal !: number;
  closeResult: string = '';
  item:any;
  public orders : any = [];

  constructor(private apiservice : ApiService,private cartservice : CartService, private modalService: NgbModal,private db: AngularFirestore,public router : Router,private orderservice : OrderService) { 
    
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, () => {
      this.closeResult = `Dismissed`;
    });
  }

  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.Products = res;
      this.grandTotal = this.cartservice.getTotalPrice();
  })

  }
  removeItem(item: any){
    this.cartservice.removeCartItem(item);
  }
  emptycart(){
    this.cartservice.removeAllCart();
  }
  

  }


