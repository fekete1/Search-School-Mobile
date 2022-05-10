import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private datas: any = [];
    constructor() {}

    keepDatas(index: string, datas: any): boolean {
        if (index) {
            this.datas[index] = datas;
            return true;
        } else {
            return false;
        }
    }

    takeDatas(index: string): any {
        if (index) {
            return this.datas[index];
        } else {
            return null;
        }
    }

    deleteDatas(index: string): boolean {
        return delete this.datas[index];
    }

}
