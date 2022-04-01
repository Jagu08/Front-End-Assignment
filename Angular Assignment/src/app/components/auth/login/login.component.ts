import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms'
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string='';

  constructor(private firebase : FirebaseService) { }

  ngOnInit(): void {
  }
login(){
  if(this.email==''){
  alert('enter your email');
  return;
}
if(this.password==''){
alert('enter your password');
return;
}

this.firebase.login(this.email,this.password);
this.email='';
this.password='';

}
}
