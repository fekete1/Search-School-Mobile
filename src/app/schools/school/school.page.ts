import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ISchoolApi } from 'src/app/models/ISchoolApi.models';

@Component({
  selector: 'app-school',
  templateUrl: './school.page.html',
  styleUrls: ['./school.page.scss'],
})
export class SchoolPage implements OnInit {

  school: ISchoolApi;
  constructor(public dataService: DataService) { }

  ngOnInit() {
      this.school = this.dataService.takeDatas('school');
      console.log(this.school);
  }
}
