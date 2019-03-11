import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() { }

    login(user, pass) {
        return new Promise((resolve, reject) => {
            firestore().app.auth().signInWithEmailAndPassword(user, pass).then(data => {
                console.log('this', data.user);
                resolve(data.user);
            }).catch(err => {
                console.log('that', err);
                reject(err.code);
            });
        });
    }
}
