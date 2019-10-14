import {Component, OnInit, ViewChild} from '@angular/core';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Transfer} from 'app/models/Transfer';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  displayedColumns: string[] = ['issue_id', 'date_due', 'renewals', 'title', 'issuedate', 'status'];
  dataSource: MatTableDataSource<Transfer>;
  isLoadingResults = true;
  transferRequests: Observable<Transfer[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private info: OverallInfoService) {}

  ngOnInit() {
    this.transferRequests = this.info.getTransferRequests();
    this.transferRequests.subscribe(data => {
      const requests = Object.keys(data).map(key => data[key]);
      console.log('requests', requests);
      this.dataSource = new MatTableDataSource(requests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });
  }

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
