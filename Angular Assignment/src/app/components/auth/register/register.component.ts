import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  email: string = '';
  password: string='';

  constructor(private firebase : FirebaseService) { }

  ngOnInit(): void {
  }
  signup(){
    if(this.email==''){
    alert('enter your email');
    return;
  }
  if(this.password==''){
  alert('enter your password');
  return;
  }
  
  this.firebase.signup(this.email,this.password);
  this.email='';
  this.password='';
  }
  }
  


