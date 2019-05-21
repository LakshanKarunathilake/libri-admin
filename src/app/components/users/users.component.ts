import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {AngularFireFunctions} from '@angular/fire/functions';
export interface UserData {
  email: string;
  name: string;
  verified: boolean;
  disabled: boolean;
  lastLogin: Date;
  created: Date;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'verified', 'disabled', 'lastLogin', 'created'];
  dataSource: MatTableDataSource<UserData>;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private aff: AngularFireFunctions) {}

  ngOnInit() {
    // Calling the cloud functions to retrieve the user details of the registered users
    this.aff.functions
      .httpsCallable('getRegisteredUsers')()
      .then(({data}) => {
        console.log(data);
        // Adding the data to the data source for the table
        const users = Object.keys(data).map(key => data[key]);
        // Deactivating spinner
        this.isLoadingResults = false;
        console.log('users', users);
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
