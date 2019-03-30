import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sendgridemail from '@sendgrid/mail';

admin.initializeApp(functions.config().firebase);
const MY_SENDGRID_API_KEY = functions.config().sengrid.key
sendgridemail.setApiKey(MY_SENDGRID_API_KEY);

export const test = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
})

export const emailCode = functions.https.onRequest((request, response) => {
    const msg = {
        to: 'megatubelite@gmail.com',
        from: 'mcgpcode@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        templateId: 'd-0ec83ddb8562469c8bb6e8fb5dcc3d9e',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
            name: 'Test User',
            code: '7953'
        }
    };
    // tslint:disable-next-line: no-floating-promises
    sendgridemail.send(msg);
});
