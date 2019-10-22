import {Reservation} from './../../models/Reservation';
import {AngularFirestore} from '@angular/fire/firestore';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {AngularFireFunctions} from '@angular/fire/functions';
import {ReservationUser} from 'app/models/ReservationUser';
import {SwalService} from 'app/services/swal/swal.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = ['biblio', 'title', 'requests'];
  dataSource: MatTableDataSource<Reservation>;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private afs: AngularFirestore,
    private aff: AngularFireFunctions,
    private swal: SwalService
  ) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations = () => {
    // Calling the cloud functions to retrieve the user details of the registered users
    this.afs
      .collection('reservation-ques')
      .valueChanges()
      .subscribe(data => {
        // Adding the data to the data source for the table
        const users = Object.keys(data).map(key => data[key]);
        // Deactivating spinner
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  };

  sendNotice = (reserveReq: Array<ReservationUser>) => {
    this.swal.confirmMessageWithText('Send Notification', 'Enter the custom test', msg => {
      if (msg) {
        console.log('text', msg);
        const user = reserveReq.sort()[0];
        console.log('s', user);
        const userInfo = this.afs
          .collection('users')
          .doc(user.uid)
          .valueChanges();
        userInfo.subscribe(data => {
          const web = data['web_token'];
          const android = data['android_token'];
          const ios = data['ios_token'];
          const sendMessageToDevice = this.aff.functions.httpsCallable('sendMessageToDevice');
          const promises = [];
          if (web) {
            promises.push(sendMessageToDevice({title: 'Reservation ready', msg, token: web}));
          }
          if (android) {
            promises.push(sendMessageToDevice({title: 'Reservation ready', msg, token: android}));
          }
          if (ios) {
            promises.push(sendMessageToDevice({title: 'Reservation ready', msg, token: ios}));
          }
          Promise.all(promises).then(() =>
            this.swal.viewSuccessMessage(
              'Success',
              'Notifications sent successful to all the devices'
            )
          );
        });
      }
    });
  };
}
