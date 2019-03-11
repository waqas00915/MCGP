import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: any = 'hassanxali94@gmail.com';
    pass: any = 'hassan';
    constructor(
        private api: ApiService
        , private navcontroller: NavController) { }

    ngOnInit() {
    }
    Home() {
        this.api.login(this.user, this.pass).then(data => {

        }).catch(err => {

        });
        this.navcontroller.navigateRoot('tabs');
    }
    SignupPage() {
        this.navcontroller.navigateForward('register');
    }
}
