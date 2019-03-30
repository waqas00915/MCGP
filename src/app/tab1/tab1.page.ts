import { Component, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    patients: any = [];

    constructor(private zone: NgZone, private api: ApiService, private navecontroller: NavController) {
        this.patients = api.incoming;
    }

    approve(date, time, i, j, key) {
        console.log(i, j);
        this.api.acceptAppointment(date, time);
    }

    reject(date, time, i, j, key) {
        delete this.patients[i].data[key];
        this.patients[i].key.splice(j, 1);
        this.api.rejectAppointment(date, time);
    }
}
