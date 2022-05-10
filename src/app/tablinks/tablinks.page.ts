import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
      if (this.dataService.takeDatas('favoriteListSchools')){
         return null;
      }
      else{
        this.dataService.keepDatas('favoriteListSchools', []);
      }
  }

}
