import { Injectable } from '@angular/core';
import { userObj } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserListingService {
  userList: userObj [];
  constructor() {
    this.userList = [
      {
        firstName: 'Allie',
        lastName: 'Grater',
        userName: 'allie001',
        city: 'New York',
        department: 'Product Development',
        isSelected: false
      }
    ]  
   }

    setData(key: string, data:any){
      localStorage.setItem(key, JSON.stringify(data));
    } 

    getData(key: string){
      const records = localStorage.getItem(key); 
      let data;   
      if(records !== null){
        data = JSON.parse(records);
      }
      return data
    }
}
