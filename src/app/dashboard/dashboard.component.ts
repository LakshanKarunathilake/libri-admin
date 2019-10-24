import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {OverallInfoService} from 'app/services/overallInfo/overall-info.service';
import {Observable} from 'rxjs';
import {Transfer} from 'app/models/Transfer';

export interface TableData {
  labels: Array<string>;
  series: Array<Array<number>>;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  feedbacks;
  registrationCount: Observable<any>;
  loginCount: Observable<any>;
  searchCount: Observable<any>;
  transferRequestCount: Observable<any>;
  transferAcceptCount: Observable<any>;
  transfers: Observable<Transfer[]>;
  statSelection = 'login';
  constructor(private overallInfo: OverallInfoService) {
    this.registrationCount = this.overallInfo.getCounter('register');
    this.loginCount = this.overallInfo.getCounter('login');
    this.searchCount = this.overallInfo.getCounter('search');
    this.transferRequestCount = this.overallInfo.getCounter('transferRequest');
    this.transferAcceptCount = this.overallInfo.getCounter('transferAccept');
    this.transfers = this.overallInfo.getTransfers();
  }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
  ngOnInit() {
    this.feedbacks = this.overallInfo.getFeedbacks();
    this.redrawChart();
  }

  redrawChart = () => {
    this.overallInfo
      .getOverallCounters(this.statSelection)
      .then((dataDailySalesChart: TableData) => {
        console.log('data', dataDailySalesChart);
        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          high: Math.max(...dataDailySalesChart['series'][0]) + 1,
          chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
        };
        const dailySalesChart = new Chartist.Line(
          '#dailySalesChart',
          dataDailySalesChart,
          optionsDailySalesChart
        );

        this.startAnimationForLineChart(dailySalesChart);
      });
  };
}
