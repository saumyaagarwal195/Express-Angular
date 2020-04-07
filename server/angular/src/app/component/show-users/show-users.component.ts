import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  USERS=[];
  constructor(private MyServiceService:MyServiceService) { }

  ngOnInit() {
    this.MyServiceService.findAllUsers().subscribe(data=>{
      console.log(data);
      if (data.success){
        this.USERS=data.users;
      }
    });
  }

}
