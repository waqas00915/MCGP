import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    constructor(private navecontroller: NavController) { }
   patients: any = [{
       name: "hassan",
       date: "8/7/19",
       time: "08:00Pm",
       image: "1"
   }]
}
