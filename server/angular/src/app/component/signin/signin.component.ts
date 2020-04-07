import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { RouterModule,Routes,Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email:String;
  username:String;
  password:String;
  BBid:String;
  Susername:String;
  Spassword:String;
  success:boolean;
  formdata;
  show="";
  Sshow="";
  constructor(private MyServiceService:MyServiceService,public Router:Router) {
    
   }

  ngOnInit() {  
  }
  addusers(){
    let user ={
      email:this.email,
      username:this.username,
      password:this.password,
      BBid:this.BBid
    };
    console.log("user:- "+user);
    this.MyServiceService.adduser(user).subscribe(data=>{
      this.show=data.msg;
    });
    let userOne={
      username:this.username
    };
    console.log("userOne:- "+userOne);
    this.MyServiceService.addUserOnDev(userOne).subscribe(data=>{
      //this.show=data.msg;
    });
    // console.log(this.email);
    this.email="";
    this.username="";
    this.password="";
    this.BBid="";
    
    
  }

  signin(){
    let user ={
      username:this.Susername,
      password:this.Spassword
    };
    //console.log(user.username);
    //console.log(user.password);
    this.MyServiceService.signin(user).subscribe(data=>{
      this.success=data.success;
    });
    this.Susername="";
    this.Spassword="";
    console.log(this.success);
    if(this.success==true){
      
      this.Router.navigate(['/userdata']);
    }

  }

}
