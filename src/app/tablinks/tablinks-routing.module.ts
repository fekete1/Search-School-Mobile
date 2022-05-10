import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
    {
        path: 'tablinks',
        component: TablinksPage,
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          },
          {
            path: 'search',
            loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
          },
          {
            path: 'favorites',
            loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesPageModule)
          },
          {
            path: '',
            redirectTo: '/tablinks/dashboard',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tablinks/dashboard',
        pathMatch: 'full'
      }
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    export class TablinksPageRoutingModule { }
