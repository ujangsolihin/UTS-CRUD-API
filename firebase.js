import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDW3KjxaZ2tayxObgti0k_KepmAnWMPC4c',
  authDomain: 'reactnativecrud-921b7.firebaseapp.com',
  projectId: 'reactnativecrud-921b7',
  storageBucket: 'reactnativecrud-921b7.firebasestorage.app',
  messagingSenderId: '675494513599',
  appId: '1:675494513599:web:e041ec2aa50e7b2facef0a',
  measurementId: 'G-D97H4P0PTQ',
};

// Initialize Firebase

if (!firebase.apps.length) {
  const app = initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
