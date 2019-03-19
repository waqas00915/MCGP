import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  constructor(private navecontroller: NavController) { }
  doctors: any = [{
      name: "Dr.Khurram",
      specialty: "Cardiologist",
      exp: "+12 Years Experience",
      img: "1",
  },
  {
      name: "Dr.Saad",
      specialty: "Neurologist",
      exp: "+13 Years Experience",
      img: "2",
  },
  {
      name: "Dr.Abdullah",
      specialty: "Radiologist",
      exp: "+14 Years Experience",
      img: "3",
  },
  {
      name: "Dr.AnthraxXx",
      specialty: "Radiologist",
      exp: "+15 Years Experience",
      img: "4",
  }]
  OpenProfile() {
      this.navecontroller.navigateForward("profile")
  }
  appointment() {
      this.navecontroller.navigateForward("book")
  }
}

