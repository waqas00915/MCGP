import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // user: any = 'h@h.com';
    // pass: any = 'hassan';
    user: any = 'testdr@mcgp.com';
    pass: any = '123456';
    doctor: any = false;
    constructor(
        public http: HttpClient,
        private alert: AlertController,
        private api: ApiService, private navcontroller: NavController) { }

    ngOnInit() {
    }
    Home() {
        this.http.get('https://us-central1-mcgp-522cf.cloudfunctions.net/test').subscribe(res => {
            console.log(res);
        });
        this.api.login(this.user, this.pass).then(data => {
            if (data === 'patient') {
                this.navcontroller.navigateRoot('home');
            } else if (data === 'doctor') {
                this.navcontroller.navigateRoot('tabs');
            } else {
                this.navcontroller.navigateRoot('admin');
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
