import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';

const config = {
    apiKey: 'AIzaSyBQy_ac_ipYtbJY73TW7Wfhr6A4Fj_7UIs',
    authDomain: 'mcgp-522cf.firebaseapp.com',
    databaseURL: 'https://mcgp-522cf.firebaseio.com',
    projectId: 'mcgp-522cf',
    storageBucket: 'mcgp-522cf.appspot.com',
    messagingSenderId: '898697221138'
};
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private afs: AngularFirestore) {
        const settings = {};
        afs.firestore.settings(settings);
    }
}
