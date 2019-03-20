import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-add-dr',
    templateUrl: './add-dr.page.html',
    styleUrls: ['./add-dr.page.scss'],
})
export class AddDrPage implements OnInit {
    doctor: any = {
        name: '', email: '', pass: '', number: '', gender: '', image: '', role: 'doctor',
        start: '01 00 PM', end: '03 00 PM', status: true, speciality: '', region: '', city: ''
    };
    constructor(private navcontroller: NavController,
        private api: ApiService,
        private loading: LoadingController,
        private alertcontroller: AlertController) { }


    AddNewDoctor() {
        this.loading.create({ message: 'Adding New Doctor...' }).then(loading => {
            loading.present();
            this.api.register(this.doctor).then(data => {
                this.navcontroller.navigateRoot('admin');
                loading.dismiss();
            });
        }).catch(err => {
            this.alertcontroller.create({ header: 'Failed', message: err }).then(a => a.present());
            this.loading.dismiss();
        });
    }

    ngOnInit() {
    }
    Back() {
        this.navcontroller.back();
    }
}
