import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userObj } from '../interfaces/user';
import { UserListingService } from '../user-listing/user-listing.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userObj: userObj;
  userList: userObj[] = [];
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private userListingService: UserListingService) {
    this.userObj = {};
    
  }

  ngOnInit(): void {
    this.userObj.userId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.userList = this.userListingService.getData('userList');
    if(this.userList !== null){
      const currentUser = this.userList.find((m: any) => m.userId == this.userObj.userId);
      if(currentUser !== undefined){
        this.userObj.firstName = currentUser.firstName;
        this.userObj.lastName = currentUser.lastName;
        this.userObj.userName = currentUser.userName;
        this.userObj.city = currentUser.city;
        this.userObj.department = currentUser.department;
      }
    }
  }

  updateUser(form: any){
    if(form.form.status === "VALID"){
      this.userList = this.userListingService.getData('userList');
      if(this.userList !== null){
        this.userList.splice(this.userList.findIndex((m: any) => m.userId == this.userObj.userId),1)
        this.userList.push(this.userObj);
        this.userListingService.setData('userList',this.userList);
      } 
      this.route.navigate(['/user-list']);
    }
  }

  close(){
    this.route.navigate(['/user-list']);
  }

}
