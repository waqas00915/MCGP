import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
}
