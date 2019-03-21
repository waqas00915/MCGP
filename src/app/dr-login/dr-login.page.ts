import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminPage } from '../admin/admin.page';

@Component({
    selector: 'app-dr-login',
    templateUrl: './dr-login.page.html',
    styleUrls: ['./dr-login.page.scss'],
})
export class DrLoginPage implements OnInit {

    constructor(public modalcontroller: ModalController) { }

    ngOnInit() {
    }
    async adminLogin() {
        const modal = await this.modalcontroller.create({
            component: AdminPage,
        });
        modal.present();
    }
}
