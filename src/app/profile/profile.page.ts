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
    // tslint:disable-next-line: max-line-length
    times: any = ['10:00 Am', '10:30 Am', '11:00 Am', '11:30 Am', '12:00 Pm', '12:30 Pm', '01:00 Pm', '01:30 Pm', '02:00 Pm', '02:30 Pm', '03:00 Pm', '03:30 Pm'];
    days: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    date: any = '';
    segmentChanged(ev: any) {
        this.section = ev.detail.value;
    }

    segmentChangedday(day, ev: Event) {
        this.date = day;
    }

    ngOnInit() {

    }

    goBack() {
        this.navcontroller.back();
    }
}
