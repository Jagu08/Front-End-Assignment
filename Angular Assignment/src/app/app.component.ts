
import { Component } from '@angular/core';
import {FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomm';
 // private firestore: FirebaseTSFirestore;
  // dataRef! : USER;

  
  constructor(public firebaseservice : FirebaseService){

    // this.firestore = new FirebaseTSFirestore();
    // this.firestore.getDocument(
    //   {

    //     path:["Products"],
    //     onComplete:(result) =>{
    //       this.dataRef =<USER> result.data();
    //     },
    //     onFail:(err) =>{
    //       alert("Failed");
    //     }
    //   }
    // );
    
  //FOR ADDING DATA TO FIREBASE
  //   this.firestore.create(
  //     {
  //       path:["Products"],
  //       data:{
  //         price:3000,
	// description:"ASIAN Men's Century-12 Running,Walking,Sports Shoes",
	// name:"Sport shoes",
	// category:"Shoes",
	// imageURL:"https://m.media-amazon.com/images/I/61tnh+UkmpL._UL1100_.jpg",
  //       },
        
  //       onComplete: (docId) =>{
  //         alert("Created" +docId);
  //       },
  //       onFail: (err)=>{
  //         alert("Failed to create")
  //       }
  //     }
  //   );

   }
  }



