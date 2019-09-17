import {Component, OnInit} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  registeredUsers;
  constructor(private aff: AngularFireFunctions) {}

  ngOnInit() {
    this.aff.functions
      .httpsCallable('getRegisteredUsers')()
      .then(data => {
        console.log(data.data);
        this.registeredUsers = data;
      });
  }
}
