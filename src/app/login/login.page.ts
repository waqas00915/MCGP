import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
<<<<<<< HEAD
import { ApiService } from '../api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: any = 'hassanxali94@gmail.com';
    pass: any = 'hassan';
    constructor(
        private api: ApiService
        , private navcontroller: NavController) { }

    ngOnInit() {
    }
    Home() {
        this.api.login(this.user, this.pass).then(data => {

        }).catch(err => {

        });
        this.navcontroller.navigateRoot('tabs');
    }
    SignupPage() {
        this.navcontroller.navigateForward('register');
    }
=======

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navcontroller:NavController) { }

  ngOnInit() {
  }
  Home(){
    this.navcontroller.navigateForward('tabs');
  }
  SignupPage(){
    this.navcontroller.navigateForward("register");
  }
>>>>>>> 061291b783420add666220be7ceb0f1dc2141d3a
}
