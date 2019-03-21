import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: any = 'h@h.com';
    pass: any = 'hassan';
    doctor: any = false;
    constructor(
        private alert: AlertController,
        private api: ApiService, private navcontroller: NavController) { }

    ngOnInit() {
    }
    Home() {
        this.api.login(this.user, this.pass).then(data => {
            if (data === 'patient') {
                this.navcontroller.navigateRoot('tabs');
            } else if (data === 'doctor') {
                this.navcontroller.navigateRoot('tabs');
            } else {
                this.navcontroller.navigateRoot('tabs');
            }
        }).catch(err => {
            this.alert.create({ header: 'Failed', message: err }).then(a => a.present());
        });
    }
    SignupPage() {
        this.navcontroller.navigateForward('register');
    }
    DrLoginPage() {
        this.navcontroller.navigateForward('dr-login');
    }
}
