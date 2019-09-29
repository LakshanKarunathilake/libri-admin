import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {BookRequest} from 'app/models/BookRequest';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.scss']
})
export class BookRequestsComponent implements OnInit {
  bookRequests: Observable<BookRequest[]>;
  constructor(private info: OverallInfoService) {}

  ngOnInit() {
    this.bookRequests = this.info.getBookRequests();
  }
}
