import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public navcontroller:NavController) { }
  goBack(){
    this.navcontroller.back();
  }
  ngOnInit() {
  }
  addDrPage(){
    this.navcontroller.navigateForward("add-dr");
  }
}
