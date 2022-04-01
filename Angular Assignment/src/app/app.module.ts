import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import {ReactiveFormsModule} from  '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/shared/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './components/auth/register/register.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { environment } from 'src/environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { FirebaseService } from './services/firebase.service';
import {FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { SuccessComponent } from './components/success/success.component';
import { AddressComponent } from './components/address/address.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    FilterPipe,
   
    HomeComponent,
        CartComponent,
        OrderComponent,
        SuccessComponent,
        AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgbModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
      FirebaseTSApp.init(environment.firebase);
  }
  
 }
