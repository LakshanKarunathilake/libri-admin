import {Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {BookRequest} from 'app/models/BookRequest';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {SwalService} from 'app/services/swal/swal.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.scss']
})
export class BookRequestsComponent implements OnInit {
  displayedColumns: string[] = ['ISBN', 'title', 'authors', 'status'];
  dataSource: MatTableDataSource<BookRequest>;
  bookRequests: Observable<BookRequest[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private info: OverallInfoService,
    private afs: AngularFirestore,
    private swal: SwalService
  ) {}

  ngOnInit() {
    this.bookRequests = this.info.getBookRequests();
    this.bookRequests.subscribe(data => {
      const requests = Object.keys(data).map(key => data[key]);
      this.dataSource = new MatTableDataSource(requests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /** Approve a transfer Request
   * If the library approves the request it doesn't need to contain a message
   */
  approveRequest = (docRef: DocumentReference) => {
    const request = docRef;
    request.update({status: 'Approved'});
  };

  /** Reject a transfer Request
   * Sometimes library have to reject a book request due to several reasons
   * Users can track their request and what has happened to  the placement
   */
  rejectRequest = (docRef: DocumentReference) => {
    const request = docRef;
    this.swal.confirmMessageWithText(
      'Confirm',
      'Do you want to reject the request if so please add a descripiton',
      message => {
        console.log('value', message);
        request.update({status: 'Rejected', message});
      }
    );
  };

  /**
   * Filter the data source
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
