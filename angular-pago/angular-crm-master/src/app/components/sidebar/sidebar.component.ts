import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private  _nav: Array<any> = [
    {routerLink: '/admin', name: 'Profile Overview', class: 'fas fa-tachometer-alt'},
    {routerLink: 'Profile', name: 'Edit Profile', class: 'far fa-address-card'},
    {routerLink: 'Jobs', name: 'Applied Jobs', class: 'fas fa-file-alt'},
    {routerLink: 'Jobs', name: 'Latest Jobs', class: 'fas fa-file-alt'},
    {routerLink: 'Jobs', name: 'Search Jobs', class: 'fas fa-file-alt'},
    {routerLink: 'Activities', name: 'Activities', class: 'fas fa-tasks'},
    {routerLink: 'setting', name: 'settings', class: 'fas fa-cog'},
  ];

  constructor() {
  }

  get Nav() {
    return this._nav;
  }

  ngOnInit() {
  }

}
