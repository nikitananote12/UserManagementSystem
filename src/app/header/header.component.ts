import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeTab = false
  constructor() { }

  ngOnInit(): void {
  }

  onNavClick(event: any){
    if(event.target.id === 'list'){
      this.activeTab = true;
    } else {
      this.activeTab = false;
    }
  }

}
