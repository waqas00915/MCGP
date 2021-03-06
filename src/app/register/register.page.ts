import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    user: any = { name: '', email: '', pass: '', number: '', gender: '', img: '', role: 'patient' };
    constructor(public navcontroller: NavController, private api: ApiService) { }

    ngOnInit() {
    }
    BacktoLogin() {
        this.navcontroller.back();
    }
    Register() {
        this.api.register(this.user).then();
    }
}
