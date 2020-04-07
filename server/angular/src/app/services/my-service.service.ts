import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MyServiceService {

  constructor(private http:Http) { }

  findAllUsers(){
    let ep='http://localhost:3000/users/all';
    return this.http.get(ep).map(res=>res.json());
  }

  adduser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://localhost:3000/users/register';
    return this.http.post(ep,user,{ headers: headers }).map(res => res.json());
  }
  
  signin(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://localhost:3000/users/authenticate';
    return this.http.post(ep,user,{ headers: headers }).map(res => res.json());
  }

  findAllBBid(){
    let ep='http://localhost:3000/BBid/all';
    return this.http.get(ep).map(res=>res.json());
  }

  addBBid(bbid){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://localhost:3000/BBid/add';
    return this.http.post(ep,bbid,{ headers: headers }).map(res => res.json());
  }

  addUserOnDev(userOne){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://localhost:3000/sensor/add';
    return this.http.post(ep,userOne,{ headers: headers }).map(res => res.json());
  }

  DisplayOneUser(){
    let ep = 'http://localhost:3000/sensor/all';
    return this.http.get(ep).map(res=>res.json());
  }
  
  buzzer(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://localhost:3000/sensor/buzzer';
    return this.http.post(ep,user,{ headers: headers }).map(res => res.json());
  }

  
}
