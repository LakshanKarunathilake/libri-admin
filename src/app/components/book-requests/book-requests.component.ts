import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {BookRequest} from 'app/models/BookRequest';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.scss']
})
export class BookRequestsComponent implements OnInit {
  bookRequests: Observable<BookRequest[]>;
  constructor(private info: OverallInfoService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.bookRequests = this.info.getBookRequests();
    // this.info.getBookRequests();
  }

  /**Approve a transfer Request */
  approveRequest = (docRef: DocumentReference) => {
    const request = docRef;
    request.update({status: 'Approved'});
  };

  /**Approve a transfer Request */
  rejectRequest = (docRef: DocumentReference) => {
    const request = docRef;
    request.update({status: 'Reject'});
  };
}
