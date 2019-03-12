import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: any = '';
    pass: any = '';
    doctor: any = false;
    constructor(
        private alert: AlertController,
        private load: LoadingController,
        private api: ApiService, private navcontroller: NavController) { }

    ngOnInit() {
    }
    Home() {
        this.load.create({ message: 'Signing In...' }).then(load => {
            load.present();
            this.api.login(this.user, this.pass, this.doctor).then(data => {
                this.navcontroller.navigateRoot('tabs');
                load.dismiss();
            }).catch(err => {
                this.alert.create({ header: 'Failed', message: err }).then(a => a.present());
                load.dismiss();
            });
        });
    }
    SignupPage() {
        this.navcontroller.navigateForward('register');
    }
}
