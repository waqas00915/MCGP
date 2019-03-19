import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private load: LoadingController,
    ) { }

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
                firestore().collection('users').doc(user.email).set(user);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}
