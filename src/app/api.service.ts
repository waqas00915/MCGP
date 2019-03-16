import { Injectable } from '@angular/core';
import { firestore } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() { }

    login(user, pass, doctor) {
        return new Promise((resolve, reject) => {
            firestore().app.auth().signInWithEmailAndPassword(user, pass).then(data => {
                console.log('this', data.user);
                if (doctor) {
                    firestore().collection('doctors').doc(user).get()
                }
                resolve(data.user);
            }).catch(err => {
                console.log('that', err);
                reject(err.code);
            });
        });
    }

    register(user) {
        return new Promise((resolve, reject) => {
            firestore().app.auth().createUserWithEmailAndPassword(user.email, user.pass).then(res => {
                console.log(res);
                firestore().collection('doctors').doc(user.email).set(user)
            }).catch(err => {
                console.log(err);

            })
        });
    }
}