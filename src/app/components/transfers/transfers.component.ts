import {Component, OnInit, ViewChild} from '@angular/core';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Transfer} from 'app/models/Transfer';
import {Observable} from 'rxjs';
import {DocumentReference} from '@angular/fire/firestore';
import {SwalService} from 'app/services/swal/swal.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  allTransferColumns: string[] = [
    'issue_id',
    'date_due',
    'renewals',
    'title',
    'issuedate',
    'status'
  ];
  toTransferColumns: string[] = [
    'issue_id',
    'title',
    'date_due',
    'issuedate',
    'sender',
    'receiver',
    'status'
  ];
  allTransfers: MatTableDataSource<Transfer>;
  toTransfers: MatTableDataSource<Transfer>;
  isLoadingResults = true;
  transferRequests: Observable<Transfer[]>;
  @ViewChild(MatPaginator) allTransferPaginator: MatPaginator;
  @ViewChild(MatPaginator) toTransferPaginator: MatPaginator;
  @ViewChild(MatSort) allTransferSort: MatSort;
  constructor(private info: OverallInfoService, private swal: SwalService) {}

  ngOnInit() {
    this.transferRequests = this.info.getTransferRequests();
    this.transferRequests.subscribe(data => {
      const requests = Object.keys(data).map(key => data[key]);
      this.allTransfers = new MatTableDataSource(requests);
      this.allTransfers.paginator = this.allTransferPaginator;
      this.allTransfers.sort = this.allTransferSort;
      this.isLoadingResults = false;

      this.toTransfers = new MatTableDataSource(
        requests.filter((element: Transfer) => element.status === 'toBeApproved')
      );
    });
  }

  /**
   * Filter the data source
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    this.allTransfers.filter = filterValue.trim().toLowerCase();
    if (this.allTransfers.paginator) {
      this.allTransfers.paginator.firstPage();
    }
  }

  /**
   * Approve a book transfer request
   * This will update the book request transfer state to 'approved'
   */
  approveTransfer = (docRef: DocumentReference) => {
    docRef
      .update({status: 'Approved'})
      .then(() => this.swal.viewSuccessMessage('Success', 'Transfer Approved'));
  };

  /**
   * Reject a book transfer request
   * This will update the book request transfer state to 'rejected'
   */
  rejectTransfer = (docRef: DocumentReference) => {
    console.log('rejecting');
    this.swal.confirmMessageWithText(
      'Confirm',
      'Do you want to reject the request if so please add a descripiton',
      message => {
        console.log('value', message);
        docRef.update({status: 'Rejected', message});
      }
    );
  };
}
