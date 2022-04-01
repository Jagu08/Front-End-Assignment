import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseAuth : AngularFireAuth,private router: Router,private db : AngularFirestore) { }
  async login(email:string,password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['/home']);
    }, err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }
  

  async signup(email:string,password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      
      localStorage.setItem('user',JSON.stringify(res.user))
      alert("registration success");
    
      this.router.navigate(['/login']);
    }, err =>{
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }
  loggedIn(){
    return !!localStorage.getItem('user')
  }


}

