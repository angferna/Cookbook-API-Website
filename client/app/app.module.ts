import {ApplicationRef, NgModule,} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';

export function tokenGetter() {
    return localStorage.getItem('id_token');
}

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,

        RouterModule.forRoot(appRoutes, {enableTracing: process.env.NODE_ENV === 'development'}),
        MainModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    static parameters = [ApplicationRef];

    constructor(private appRef: ApplicationRef) {
        this.appRef = appRef;
    }
}
