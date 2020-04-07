import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { enableProdMode } from '@angular/core';


import { AppComponent } from './app.component';
import { SigninComponent } from './component/signin/signin.component';
import { ShowUsersComponent } from './component/show-users/show-users.component';

import { MyServiceService } from './services/my-service.service';
import { AddBbidComponent } from './component/add-bbid/add-bbid.component';
import { UserdataComponent } from './component/userdata/userdata.component';


enableProdMode();

const appRoutes: Routes=[
  {path:'',component:SigninComponent},
  {path:'show',component:ShowUsersComponent},
  {path:'bbid',component:AddBbidComponent},
  {path:'userdata',component:UserdataComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ShowUsersComponent,
    AddBbidComponent,
    UserdataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
