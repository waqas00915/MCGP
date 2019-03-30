import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from '../api.service';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    section: any = 'seg1';
    doctor: any;
    days: any = [];
    date: any = '';
    constructor(public navcontroller: NavController, private api: ApiService) {
        this.doctor = this.api.getDr();
        console.log('dr profile', this.doctor);

        for (let index = 0; index < 10; index++) {
            this.days.push({ day: moment().add(index, 'days').format('MMM Do'), times: [] });
            this.getTimeStops(this.doctor.dr.start, this.doctor.dr.end, index);
        }

        console.log(this.days);
    }
    segmentChanged(ev: any) {
        this.section = ev.detail.value;
    }

    segmentChangedday(day, i) {
        this.date = day;
        this.api.load.create({ message: 'Getting Available Slots for ' + this.date }).then(l => {
            l.present();
            console.log(moment(day, 'MMM Do').format('MMMM Do YYYY'));
            this.api.getAvailableSlots(moment(day, 'MMM Do').format('MMMM Do YYYY')).then((data: any) => {
                data.forEach(item => {
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            console.log('loop me');
                            // tslint:disable-next-line: arrow-return-shorthand
                            const index = this.days[i].times.findIndex(time => { return time.time === key; });
                            this.days[i].times[index].status = false;
                        }
                    }
                });
                l.dismiss();
            });
        });
    }

    getTimeStops(start, end, i) {
        const startTime = moment(start, 'hh mm a');
        const endTime = moment(end, 'hh mm a');
        while (startTime < endTime) {
            this.days[i].times.push({ time: moment(startTime).format('hh mm a'), status: true });
            startTime.add(30, 'minutes');
        }
    }

    book(f, time) {
        if (f === false) {
            this.api.alert.create({
                message: 'This slot is already booked. Please choose a different slot.',
                buttons: [{ text: 'Ok' }]
            }).then(a => {
                a.present();
            });
        } else {
            this.api.alert.create({
                header: 'Confirm Booking for ' + time + '?', buttons: [{ text: 'Cancel', role: 'cancel' }, {
                    text: 'Yes', handler: (data) => {
                        this.api.makeAppointment(moment(this.date, 'MMM Do').format('MMMM Do YYYY'), time);
                    }
                }]
            }).then(a => {
                a.present();
            });
        }
    }

    ngOnInit() {

    }

    goBack() {
        this.navcontroller.back();
    }
}
