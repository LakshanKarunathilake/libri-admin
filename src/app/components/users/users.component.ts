import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {AngularFireFunctions} from '@angular/fire/functions';
import {AdminService} from 'app/services/admin/admin.service';
import {SwalService} from 'app/services/swal/swal.service';
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
  constructor(
    private aff: AngularFireFunctions,
    private admin: AdminService,
    private swal: SwalService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeUserState = (uid, changeTo) => {
    this.admin
      .changeUserActiveness(uid, changeTo)
      .then(() => {
        console.log(`Success in ${uid} transfer to ${changeTo}`);
        this.swal.viewSuccessMessage('Success', `User id ${uid} is successfully ${changeTo}ed`);
        this.getUsers();
      })
      .catch(err => {
        console.log('err', err);
        this.swal.viewErrorMessage('Error', `Change state failed please try again`);
      });
  };

  getUsers = () => {
    // Calling the cloud functions to retrieve the user details of the registered users
    this.aff.functions
      .httpsCallable('getRegisteredUsers')()
      .then(({data}) => {
        // Adding the data to the data source for the table
        const users = Object.keys(data).map(key => data[key]);
        // Deactivating spinner
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  };
}
