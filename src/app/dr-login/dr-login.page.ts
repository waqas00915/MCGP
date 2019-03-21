import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-dr-login',
    templateUrl: './dr-login.page.html',
    styleUrls: ['./dr-login.page.scss'],
})
export class DrLoginPage implements OnInit {

    constructor(public navcontroller:NavController) { }

    ngOnInit() {
    }
    BacktoLogin(){
        this.navcontroller.back();
    }
}
