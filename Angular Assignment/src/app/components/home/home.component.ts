import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Products : Observable<any[]>;
  
  constructor(db: AngularFirestore,private cartservice : CartService,private apiservice : ApiService,public router : Router) { 
  
   this.Products = db.collection('Products').valueChanges();
 
 
  }
  
  ngOnInit(): void {
 
  }
addtocart(item: any){
  if(localStorage.getItem('user')==null){
    alert("logout");
   this.router.navigate(['./login'])
  }
  else{
    this.cartservice.addtoCart(item);
  }
 
} 
filtrarData() {
  this.Products = this.apiservice.filterBy()
  return this.Products;
};
  filtrarElectronicsData() {
    this.Products = this.apiservice.filterByElectronics()
    return this.Products;
  };
  filtrarCosmeticsData() {
    this.Products = this.apiservice.filterByCosmetics()
    return this.Products;
  };
  filtrarShoesData() {
    this.Products = this.apiservice.filterByShoes()
    return this.Products;
  };
  filtrarWomensClothesData() {
    this.Products = this.apiservice.filterByWomensClothes()
    return this.Products;
  };
  filtrarManClothesData() {
    this.Products = this.apiservice.filterByManClothes()
    return this.Products;
  };


}

