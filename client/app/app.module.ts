import {ApplicationRef, NgModule,} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';
import {DirectivesModule} from '../components/directives.module';
import {JwtModule} from '@auth0/angular-jwt';
import {AccountModule} from './account/account.module';
import {AdminModule} from './admin/admin.module';
import {UsersModule} from './users/users.module';

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
        JwtModule.forRoot({
            config: {
                tokenGetter,
            }
        }),

        RouterModule.forRoot(appRoutes, {enableTracing: process.env.NODE_ENV === 'development'}),

        MainModule,
        DirectivesModule,
        AccountModule,
        AdminModule,
        UsersModule
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
