import { Component, OnInit } from '@angular/core';
import { Log } from '../classes';
import { AppService } from '../app.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  logs!: Log[];

  constructor(private dataService: AppService) { }

  ngOnInit(): void {
    this.logs = this.dataService.getLogs()
    .sort((a, b) => {
      return <any>new Date(b.Date) - <any>new Date(a.Date)});
  }

}
