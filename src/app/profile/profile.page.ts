import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    section: any = 'seg1';
    constructor(public navcontroller: NavController) { }

    segmentChanged(ev: any) {
        this.section = ev.detail.value;
    }

    ngOnInit() {
    }

    goBack() {
        this.navcontroller.back();
    }
}
