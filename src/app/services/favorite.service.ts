import { Injectable } from '@angular/core';
import { ISchoolApi } from '../models/ISchoolApi.models';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {

    constructor( public dataService: DataService) {
    }

    getAllFavoriteSchools() {
        return this.dataService.takeDatas('favoriteListSchools');
    }

    deleteFavoriteSchool(school: ISchoolApi) {
        const  listFavoriteSchools =  this.dataService.takeDatas('favoriteListSchools');
        listFavoriteSchools.pop(school);
        this.dataService.keepDatas('favoriteListSchools', listFavoriteSchools);
    }

    setFavoriteSchool(school: ISchoolApi) {
        const  listFavoriteSchools =  this.dataService.takeDatas('favoriteListSchools');
        listFavoriteSchools.push(school);
        this.dataService.keepDatas('favoriteListSchools', listFavoriteSchools);
    }
}
