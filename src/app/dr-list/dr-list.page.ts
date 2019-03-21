import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dr-list',
  templateUrl: './dr-list.page.html',
  styleUrls: ['./dr-list.page.scss'],
})
export class DrListPage implements OnInit {
  name: string;
  drs: any = [];
  constructor(private api: ApiService, public navcontroller: NavController) {
    this.drs = this.api.doctorList;
    console.log(this.drs);

  }

  ngOnInit() {
  }

  OpenProfile(index) {
    console.log(index);
    this.api.drIndex = index;
    this.navcontroller.navigateForward('profile');
  }
  goBack() {
    this.navcontroller.back();
  }
}
