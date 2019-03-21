import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    docs: any = [];
    // doctors: any = [{
    //     name: 'Dr.Khurram',
    //     specialty: 'Cardiologist',
    //     exp: '+12 Years Experience',
    //     img: '1',
    // },
    // {
    //     name: 'Dr.Saad',
    //     specialty: 'Neurologist',
    //     exp: '+13 Years Experience',
    //     img: '2',
    // },
    // {
    //     name: 'Dr.Abdullah',
    //     specialty: 'Radiologist',
    //     exp: '+14 Years Experience',
    //     img: '3',
    // },
    // {
    //     name: 'Dr.AnthraxXx',
    //     specialty: 'Radiologist',
    //     exp: '+15 Years Experience',
    //     img: '4',
    // }];
    constructor(private navecontroller: NavController, private api: ApiService) { }
    ngOnInit(): void {
        this.api.getAllSpecialists().then(data => {
            this.docs = data;
            console.log(this.docs);
        });
    }
    OpenProfile() {
        this.navecontroller.navigateForward('profile');
    }
    appointment() {
        this.navecontroller.navigateForward('book');
    }
}

