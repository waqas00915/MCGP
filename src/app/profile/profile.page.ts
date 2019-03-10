import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
segmentChanged(ev: any){
  console.log("segment changed",ev);
}
  constructor(public navcontroller:NavController) { }

  ngOnInit() {
  }
  goBack(){
    this.navcontroller.back();
  }
}
