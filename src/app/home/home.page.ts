import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    docs: any = [];
    section: any;

    constructor(private navecontroller: NavController, private api: ApiService) { }
    ngOnInit(): void {
        this.api.getAllSpecialities().then(data => {
            this.docs = data;
            console.log(this.docs);
        });

        
    }
    showDr(name) {
        this.api.load.create({ message: 'Getting all ' + name + ' Doctors...' }).then(l => {
            l.present();
            this.api.getAllSpecialists(name).then(a => {
                this.navecontroller.navigateForward('dr-list');
                l.dismiss();
            });
        });
    }
    segmentChanged(ev: any) {
        this.section = ev.detail.value;
    }

}

