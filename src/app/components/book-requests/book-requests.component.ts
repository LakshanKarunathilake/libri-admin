import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {BookRequest} from 'app/models/BookRequest';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {SwalService} from 'app/services/swal/swal.service';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.scss']
})
export class BookRequestsComponent implements OnInit {
  bookRequests: Observable<BookRequest[]>;
  constructor(
    private info: OverallInfoService,
    private afs: AngularFirestore,
    private swal: SwalService
  ) {}

  ngOnInit() {
    this.bookRequests = this.info.getBookRequests();
    // this.info.getBookRequests();
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
}
