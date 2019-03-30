import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    approved: any;
    rejected: any;
    doctorList: any = [];
    drIndex: any;
    user: any;
    incoming: any = [];

    constructor(
        public load: LoadingController,
        public alert: AlertController
    ) { }
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
                        console.log(d.data());
                        if (role === 'doctor') {
                            this.user = d.data();
                            resolve('doctor');
                        } else if (role === 'patient') {
                            this.user = d.data();
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
            const send = [];
            firestore().collection('users/' + this.getDr().dr.email + '/pending').doc(date)
                .get().then(data => {
                    send.push(data.data());
                    console.log('we are here 2', send);
                    firestore().collection('users/' + this.getDr().dr.email + '/approved').doc(date)
                        .get().then(data2 => {
                            send.push(data2.data());
                            resolve(send);
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        });
    }

    makeAppointment(date, time) {
        return new Promise((resolve, reject) => {
            firestore().collection('users/' + this.getDr().dr.email + '/pending').doc(date).update
                ({
                    [time]: {
                        remarks: '',
                        user: firestore().doc('/users/' + this.user.email),
                        time: time,
                        name: this.user.name
                    }
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log('aeradadss');

                    const t = '' + err;
                    console.log(t);
                    if (t.startsWith('FirebaseError: [code=not-found]: No document to update')) {
                        firestore().collection('users/' + this.getDr().dr.email + '/pending').doc(date).set
                            ({
                                [time]: {
                                    remarks: '',
                                    user: firestore().doc('/users/' + this.user.email),
                                    time: time,
                                    name: this.user.name
                                }
                            }).then(res => {
                                console.log(res);
                            }).catch(erer => {
                                console.log(erer);
                            });
                    }
                });

            firestore().collection('users/' + this.user.email + '/bookings').doc(date).update
                ({
                    [time]: {
                        remarks: '',
                        user: firestore().doc('/users/' + this.getDr().dr.email),
                        time: time,
                        name: this.getDr().dr.name
                    }
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log('aeradadss');

                    const t = '' + err;
                    console.log(t);
                    if (t.startsWith('FirebaseError: [code=not-found]: No document to update')) {
                        firestore().collection('users/' + this.user.email + '/bookings').doc(date).set
                            ({
                                [time]: {
                                    remarks: '',
                                    user: firestore().doc('/users/' + this.getDr().dr.email),
                                    time: time,
                                    name: this.getDr().dr.name
                                }
                            }).then(res => {
                                console.log(res);
                            }).catch(erer => {
                                console.log(erer);
                            });
                    }
                });
        });
    }

    acceptAppointment(date, time) {
        return new Promise((resolve, reject) => {
            firestore().collection('users/' + this.user.email + '/pending').doc(date).update
                ({ [time]: firestore.FieldValue.delete() }).then(res => {
                    console.log(res);
                    firestore().collection('users/' + this.user.email + '/approved').doc(date).update
                        ({
                            [time]: {
                                remarks: '',
                                user: firestore().doc('/users/' + this.user.email),
                                time: time,
                                name: this.user.name
                            }
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            const t = '' + err;
                            console.log(t);
                            if (t.startsWith('FirebaseError: [code=not-found]: No document to update')) {
                                firestore().collection('users/' + this.user.email + '/approved').doc(date).set
                                    ({
                                        [time]: {
                                            remarks: '',
                                            user: firestore().doc('/users/' + this.user.email),
                                            time: time,
                                            name: this.user.name
                                        }
                                    }).then(res => {
                                        console.log(res);
                                    }).catch(erer => {
                                        console.log(erer);
                                    });
                            }
                        });
                }).catch(err => {
                    console.log('ye wala idher', err);

                });
        });
    }

    rejectAppointment(date, time) {
        return new Promise((resolve, reject) => {
            firestore().collection('users/' + this.user.email + '/pending').doc(date).update
                ({ [time]: firestore.FieldValue.delete() }).then(res => {
                    console.log(res);
                    firestore().collection('users/' + this.user.email + '/rejected').doc(date).update
                        ({
                            [time]: {
                                remarks: '',
                                user: firestore().doc('/users/' + this.user.email),
                                time: time,
                                name: this.user.name
                            }
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            const t = '' + err;
                            console.log(t);
                            if (t.startsWith('FirebaseError: [code=not-found]: No document to update')) {
                                firestore().collection('users/' + this.user.email + '/rejected').doc(date).set
                                    ({
                                        [time]: {
                                            remarks: '',
                                            user: firestore().doc('/users/' + this.user.email),
                                            time: time,
                                            name: this.user.name
                                        }
                                    }).then(res => {
                                        console.log(res);
                                    }).catch(erer => {
                                        console.log(erer);
                                    });
                            }
                        });
                }).catch(err => {
                    console.log('ye wala idher', err);

                });
        });
    }
    incomingAppointments() {
        return new Promise((resolve, reject) => {
            firestore().collection('users/' + this.user.email + '/pending').get().then(data => {
                console.log(data.docs);
                let count = 0;
                let index = 0;
                for (const key in data.docs) {
                    if (data.docs.hasOwnProperty(key)) {
                        const element = data.docs[key];
                        this.incoming.push({
                            id: element.id,
                            key: Object.keys(element.data()),
                            data: element.data()
                        });
                        count += this.incoming[index++].key.length;
                    }
                }
                console.log(count);
                resolve(count);
            });
        });
    }

    approvedAppointments() {
        return new Promise((resolve, reject) => {
            firestore().collection('users/' + this.user.email + '/pending').get().then(data => {
                console.log(data.docs);
                let count = 0;
                let index = 0;
                for (const key in data.docs) {
                    if (data.docs.hasOwnProperty(key)) {
                        const element = data.docs[key];
                        this.approved.push({
                            id: element.id,
                            key: Object.keys(element.data()),
                            data: element.data()
                        });
                        count += this.approved[index++].key.length;
                    }
                }
                console.log(count);
                resolve(count);
            });
        });
    }

    rejectedAppointments() {
        return new Promise((resolve, reject) => {
            firestore().collection('users/' + this.user.email + '/pending').get().then(data => {
                console.log(data.docs);
                let count = 0;
                let index = 0;
                for (const key in data.docs) {
                    if (data.docs.hasOwnProperty(key)) {
                        const element = data.docs[key];
                        this.rejected.push({
                            id: element.id,
                            key: Object.keys(element.data()),
                            data: element.data()
                        });
                        count += this.rejected[index++].key.length;
                    }
                }
                console.log(count);
                resolve(count);
            });
        });
    }

    myAppointments() {

    }
}
