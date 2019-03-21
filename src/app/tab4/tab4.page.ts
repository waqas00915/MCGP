import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }
  patients: any = [{
    name: "hassan",
    date: "8/7/19",
    time: "08:00Pm",
    image: "1"
}]
  ngOnInit() {
  }

}
