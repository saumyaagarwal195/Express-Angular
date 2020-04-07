import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bbid',
  templateUrl: './add-bbid.component.html',
  styleUrls: ['./add-bbid.component.css']
})
export class AddBbidComponent implements OnInit {
  
  BBID=[];
  BBid:String;
  show="";
  constructor(private MyServiceService:MyServiceService) { }

  ngOnInit() {
    this.MyServiceService.findAllBBid().subscribe(data=>{
      console.log(data);
      if (data.success){
        this.BBID=data.BBid;
      }
    });
  }

  addBBid(){
    let bbid ={
      BBid:this.BBid
    };
    this.MyServiceService.addBBid(bbid).subscribe(data=>{
      this.show=data.msg;
    });
    // console.log(this.email);
    this.BBid="";
  }

}
