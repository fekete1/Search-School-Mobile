import { FavoriteService } from './../services/favorite.service';
import { SchoolService } from './../services/school.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ISchoolApi } from '../models/ISchoolApi.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    school = {} as ISchoolApi;
    listSchoolsReference: ISchoolApi[];

    listSchoolsFiltered: ISchoolApi[];

    listSchoolsFavorite: ISchoolApi[];

    constructor(
        public alertController: AlertController,
        public toastController: ToastController,
        public dataService: DataService,
        public route: Router,
        public schoolService: SchoolService,
        public favoriteService: FavoriteService,
    ) {}

    // Exibe todas as informações da escola clicada em uma tela diferente, guardando as informações
    // da escola clicada em uma memória temporária e apontando a tela que tem que ser aberta
    presentSchool(school: ISchoolApi) {
        this.dataService.keepDatas('school', school);
        this.route.navigateByUrl('/school');
    }

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

    ngOnInit() {
        this.getAllSchools();
        this.listSchoolsFavorite = this.dataService.takeDatas('favoriteListSchools');
    }

    // Retorna todas as Escolas presentes na API e altera o valor da variável listSchools da classe
    async getAllSchools(){
        return await this.schoolService.indexSchools().subscribe((listSchools: ISchoolApi[]) => {
                this.listSchoolsReference= listSchools;
                this.listSchoolsFiltered = listSchools;
                this.dataService.keepDatas('listSchools', this.listSchoolsReference);
            }
        );
    };

    // Função que recebe a busca por partes do usuário e retorna um Array com
    // as escolas que tem aquelas palavras digitadas no nome
    autoComplete(search: string) {
        return this.listSchoolsReference.filter((value) => {
            const tinyValue = value.noEntidade.toLowerCase();
            const tinySchool = search.toLowerCase();
            const inepValue = value.coEntidade.toString();
            return tinyValue.includes(tinySchool) || inepValue.includes(tinySchool);
        });
    }

    // Função que mostra na tela as escolas que o usuário está pesquisando, observando as letras que o
    // usuário está digitando e mostrando sugestões, recebe o evento que está sendo digitado algo
    getSchoolsSearch(event: any){
        const search = event.target.value;
        if(search === ''){
            this.listSchoolsFiltered = this.listSchoolsReference;
        }
        else{
            this.listSchoolsFiltered = this.autoComplete(search);
        }
    }
}


