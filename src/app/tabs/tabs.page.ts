import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    incoming: any = 0;
    constructor(public api: ApiService) {
        console.log('this works');
        this.api.incomingAppointments().then(num => this.incoming = num);
    }
}
