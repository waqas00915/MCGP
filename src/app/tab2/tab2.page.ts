import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  patients: any = [{
    name: "hassan",
    date: "8/7/19",
    time: "08:00Pm",
    image: "1"
}]
}
