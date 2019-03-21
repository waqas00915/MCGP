import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private navecontroller: NavController) { }
  patients: any = [{
    name: "hassan",
    date: "8/7/19",
    time: "08:00Pm",
    image: "1"
}]
  adminLogin(){
    this.navecontroller.navigateForward("admin");
  }
}
