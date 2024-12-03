import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

export const initializeFirebase = () => {
  const serviceAccount: ServiceAccount = require('../src/fir-d9bb1-firebase-adminsdk-eh6wu-00564f29c4.json');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://fir-d9bb1.appspot.com',
    });
  }
};
