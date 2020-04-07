import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { SigninComponent } from '../signin/signin.component'
@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  username:String;
  SENSORS=[];

  constructor(private MyServiceService:MyServiceService ) {
   }

  ngOnInit() {
    this.MyServiceService.DisplayOneUser().subscribe(data=>{
      console.log(data);
      if (data.success){
        this.SENSORS=data.sensors;
      }
    });
  }
  buzzer(){
    let user ={
      username:this.username,
    };
    this.MyServiceService.buzzer(user).subscribe(data=>{

    });
  }


}
