import { Component, OnInit } from '@angular/core';
import { ISchoolApi } from '../models/ISchoolApi.models';
import { DataService } from '../services/data.service';
import { SchoolService } from '../services/school.service';
import { FavoriteService } from '../services/favorite.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    listSchoolsReference: ISchoolApi[];
    listSchoolsFavorite: ISchoolApi[];
    constructor( public dataService: DataService,
        public schoolService: SchoolService,
        public favoriteService: FavoriteService,
        public alertController: AlertController,
        public toastController: ToastController,
        public route: Router,) { }

    ngOnInit() {

        this.listSchoolsFavorite =  this.dataService.takeDatas('favoriteListSchools'); //puxar da api se tivesse
        this.getAllSchools();
    }

    // Exibe todas as informações da escola clicada em uma tela diferente, guardando as informações
    // da escola clicada em uma memória temporária e apontando a tela que tem que ser aberta
    presentSchool(school: ISchoolApi) {
        this.dataService.keepDatas('school', school);
        this.route.navigateByUrl('/school');
    }

    async getAllSchools(){
        return await this.schoolService.indexSchools().subscribe((listSchools: ISchoolApi[]) => {
                this.listSchoolsReference= listSchools;
                this.dataService.keepDatas('listSchools', this.listSchoolsReference);
            }
        );
    };

    async presentConfirmFav(favoriteSchool: ISchoolApi) {
        if (this.listSchoolsFavorite.includes(favoriteSchool)){
            const alert = await this.alertController.create({
                cssClass: 'confirm-fav',
                header: 'Alerta!',
                message: 'Deseja realmente retirar essa escola do favorito?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        id: 'cancel-button',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        },
                    },
                    {
                        text: 'Sim, Retirar',
                        id: 'confirm-button',
                        handler: () => {
                            console.log('Confirm Okay');
                            this.favoriteService.deleteFavoriteSchool(favoriteSchool);
                            console.log(this.dataService.takeDatas('favoriteListSchools'));
                            this.presentUnfavoriteToast();
                        },
                    },
                ],
            });
            await alert.present();
        }
        else{
            const alert = await this.alertController.create({
                cssClass: 'confirm-fav',
                header: 'Alerta!',
                message: 'Deseja realmente favoritar essa escola?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        id: 'cancel-button',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        },
                    },
                    {
                        text: 'Sim, Favoritar',
                        id: 'confirm-button',
                        handler: () => {
                            console.log('Confirm Okay');
                            this.favoriteService.setFavoriteSchool(favoriteSchool);
                            console.log(this.dataService.takeDatas('favoriteListSchools'));
                            this.presentFavoriteToast();
                        },
                    },
                ],
            });
            await alert.present();
        }

    }

    async presentFavoriteToast() {
        const toast = await this.toastController.create({
            message: 'Escola adicionada aos favoritos.',
            duration: 2000,
            color: 'success',
        });
        toast.present();
    }

    async presentUnfavoriteToast() {
        const toast = await this.toastController.create({
            message: 'Escola retirada dos favoritos.',
            duration: 2000,
            color: 'warning',
        });
        toast.present();
    }
}
