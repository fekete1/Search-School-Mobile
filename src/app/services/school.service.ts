import { ISchoolApi } from './../models/ISchoolApi.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SchoolService {
    private apiUrl = 'http://157.230.55.217/api';

    constructor(
        private http: HttpClient,
        public toastController: ToastController
    ) {}

    indexSchools(): Observable<ISchoolApi[]> {
        const url = `${this.apiUrl}/escolas`;
        return this.http.get<ISchoolApi[]>(url)
        .pipe(
            map(response =>  response)
            );

        // return data.pipe(
        //     map((response) => response),
        //     catchError((error) => this.presentError(error))
        // );
    }

    async presentError(error) {
        const toast = await this.toastController.create({
            message: 'Não foi encontrado essa escola',
            duration: 2000,
            color: 'danger',
            position: 'middle',
        });
        toast.present();
        return null;
    }
}
