import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
<<<<<<< HEAD
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    section: any = 'seg1';
    constructor(public navcontroller: NavController) { }

    segmentChanged(ev: any) {
        this.section = ev.detail.value;
    }

    ngOnInit() {
    }

    goBack() {
        this.navcontroller.back();
    }
=======
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
>>>>>>> 061291b783420add666220be7ceb0f1dc2141d3a
}
