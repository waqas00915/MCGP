import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        public load: LoadingController,
        public alert: AlertController
    ) { }
    doctorList: any = [];
    drIndex: any;

    getDr() {
        return this.doctorList[this.drIndex];
    }

    login(user, pass) {
        return new Promise((resolve, reject) => {
            this.load.create({ message: 'Signing In...', spinner: 'crescent' }).then(load => {
                load.present();
                firestore().app.auth().signInWithEmailAndPassword(user, pass).then(data => {
                    load.message = 'Getting data...';
                    load.forceUpdate();
                    firestore().collection('users').doc(user).get().then(d => {
                        const role = d.data().role;
                        if (role === 'doctor') {
                            resolve('doctor');
                        } else if (role === 'patient') {
                            resolve('patient');
                        } else {
                            resolve('admin');
                        }
                        load.dismiss();
                    });
                }).catch(err => {
                    console.log('that', err);
                    reject(err.code);
                    load.dismiss();
                });
            });
        });
    }

    register(user) {
        return new Promise((resolve, reject) => {
            firestore().app.auth().createUserWithEmailAndPassword(user.email, user.pass).then(res => {
                console.log(res);
                firestore().collection('users').doc(user.email).set(user).then(val => {
                    firestore().collection('specializations').doc(user.speciality).set({ status: true });
                });
            }).catch(err => {
                console.log(err);
            });
        });
    }

    getAllSpecialities() {
        return new Promise((resolve, reject) => {
            firestore().collection('specializations').where('status', '==', true).get().then(data => {
                const temp: any = data.docs.map(doc => doc.id);
                temp.forEach((item, index) => {
                    firestore().app.storage().ref(item.toLowerCase() + '.png').getDownloadURL().then(img => {
                        temp[index] = { img: img, name: item };
                        if (index + 1 === temp.length) {
                            resolve(temp);
                        }
                    });
                });
            });
        });
    }
    getAllSpecialists(name) {
        return new Promise((resolve, reject) => {
            this.doctorList = [];
            firestore().collection('users').where('speciality', '==', name)
                .where('status', '==', true)
                .where('role', '==', 'doctor')
                .get().then(data => {
                    const temp: any = data.docs.map(doc => doc.data());
                    temp.forEach((item, index) => {
                        firestore().app.storage().ref('doctors/' + item.email.toLowerCase() + '.jpg').getDownloadURL().then(img => {
                            this.doctorList.push({ img: img, dr: item });
                            if (index + 1 === temp.length) {
                                resolve('true');
                            }
                        });
                    });
                }).catch(err => console.log(err));
        });
    }

    getAvailableSlots(date) {
        return new Promise((resolve, reject) => {
            console.log('we are here');
            firestore().collection('users/' + this.getDr().dr.email + '/bookings').doc(date)
                .get().then(data => {
                    const temp: any = data.data();
                    resolve(temp);
                }).catch(err => console.log(err));
        });
    }
}
