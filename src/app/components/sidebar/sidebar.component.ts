import {Component, OnInit} from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
  {path: '/users', title: 'User Information', icon: 'person', class: ''},
  {path: '/bookrequests', title: 'New book Requests', icon: 'shopping_basket', class: ''},
  {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''},
  {path: '/transfers', title: 'Transfers', icon: 'swap_vert', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
