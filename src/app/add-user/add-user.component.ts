import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userObj } from '../interfaces/user';
import { UserListingService } from '../user-listing/user-listing.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: []
})
export class AddUserComponent implements OnInit {
  userObj: userObj;
  userList: userObj []  = [];
  constructor(private route: Router, private userListingService: UserListingService) {
    this.userObj = {};
  }

  ngOnInit(): void {
  }

  getNewUserId(){
    this.userList = this.userListingService.getData('userList');
    if(this.userList !== null){
      return this.userList.length + 1;
    } else{
      return 1;
    }
  }

  saveUser(form: any){
    if(form.form.status === "VALID"){
      const latestId = this.getNewUserId();
      this.userObj.userId = latestId;
      this.userList = this.userListingService.getData('userList');
      if(this.userList !== null){
        this.userList.push(this.userObj);
        this.userListingService.setData('userList',this.userList);
      } else{
        this.userList = [];
        this.userList.push(this.userObj);
        this.userListingService.setData('userList',this.userList);
      }
      this.route.navigate(['/user-list'])
    }
  }

  close(){
    this.route.navigate(['/user-list']);
  }

}
