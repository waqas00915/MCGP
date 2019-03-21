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
    times: any = ["10:00 Am", "10:30 Am", "11:00 Am", "11:30 Am", "12:00 Pm", "12:30 Pm", "01:00 Pm", "01:30 Pm", "02:00 Pm", "02:30 Pm", "03:00 Pm", "03:30 Pm"];
    segmentChanged(ev: any) {
        this.section = ev.detail.value;
    }

    ngOnInit() {
    }

    goBack() {
        this.navcontroller.back();
    }
}
