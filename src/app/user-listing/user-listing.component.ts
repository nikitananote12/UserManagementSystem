import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { contextualMenu } from '../interfaces/contextualMenus';
import { userObj } from '../interfaces/user';
import { UserListingService } from './user-listing.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  userList: userObj [];
  selectedRows: userObj[] = [];
  index = -1;
  isShowToolbar = false;
  contextualMenu: Array<contextualMenu> = [];
  p: number = 1;
  departmentArray: any[] = [];
  filteredDepartmentArray: any[] = [];
  filteredData: any[] = []
  dataAddedFirstTime = false;
  key: string = "id";
  reverse: boolean = false;
  constructor(private route: Router, private userListingService: UserListingService, private appComponent: AppComponent) { 
    this.userList = [];
  }
  ngOnInit(): void {
    this.userList = this.userListingService.getData('userList');
    this.dataAddedFirstTime = this.userListingService.getData('noData');
    if(this.dataAddedFirstTime){
      this.displayUserList();
    }else{
      this.userList = this.userListingService.userList;
      this.dataAddedFirstTime = true;
      this.userListingService.setData('userList',this.userList);
      this.userListingService.setData('noData',this.dataAddedFirstTime);
    }
  }

  displayUserList(){
    this.userList = this.userListingService.getData('userList');
    if(this.userList !== null){
      for(let list of this.userList){
        this.departmentArray.push(list.department);
      }
      this.filteredDepartmentArray = this.departmentArray.filter((value, index, categoryArray) => categoryArray.indexOf(value) === index);
    }
  }

  createUser(){
    this.route.navigate(['/add-user']);
  }

  createContextualMenu(selectedRows: number) {
    this.contextualMenu = [];
    const columns = [];
    const editMenu = {
      id: 1,
      name: 'edit',
      isBulkAction: false
    };
    const deleteMenu = {
      id: 2,
      name: 'delete',
      isBulkAction: true
    };
    if(selectedRows === 1) {
      columns.push(editMenu);
      columns.push(deleteMenu);
    } else if(selectedRows > 1){
      columns.push(deleteMenu);
    }
    this.contextualMenu = columns
  }

  OnRowClick(id: any){
    for(let user of this.userList){
      if(user.userId === id){
        user.isSelected = !user.isSelected;
        if(user.isSelected){
          this.isShowToolbar = true;
          this.selectedRows.push(user);
        } else{
          this.index = this.selectedRows.findIndex(x => x.userId == id);
          this.selectedRows.splice(this.index, 1);
          if(this.selectedRows.length === 0){
            this.isShowToolbar = false;
          }
        }
        this.createContextualMenu(this.selectedRows.length)
      }
    }
  }

  contextMenuAction(name: any){
    switch (name) {
      case 'edit':
        if(!this.selectedRows[0].userId ){
          this.userList.map(x=>{
            if(!x.userId){
              x.userId = 1;
            }
          })
          this.userListingService.setData('userList',this.userList);
          this.route.navigate(['edit-user',1]);
        } else{
          this.route.navigate(['edit-user',this.selectedRows[0].userId]);
        }
        break;
      case 'delete':
        for(let row of this.selectedRows){
          this.userList = this.userListingService.getData('userList');
          if(this.userList !== null){
            this.userList.splice(this.userList.findIndex((m: any) => m.userId == row.userId),1);
            this.userListingService.setData('userList',this.userList);
            this.dataAddedFirstTime = this.userListingService.getData('noData');
            this.isShowToolbar = false;
          } 
        }
        this.displayUserList();
        break;
      default:
        break;
    }
  }

  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  addFilter(filter: any){
    this.filteredData = [];
    this.displayUserList();
    for(let user of this.userList){
      if(user.department === filter){
        this.filteredData.push(user);
      } else if(filter === 'all'){
        this.filteredData = this.userList;
      }
    }
    this.userList = this.filteredData;
  }
}
