import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBjV65WrxL-as7wWZaSv3np78JteH2eRZo',
  authDomain: 'quizzlybearapp.firebaseapp.com',
  databaseURL: 'https://quizzlybearapp.firebaseio.com',
  projectId: 'quizzlybearapp',
  storageBucket: 'quizzlybearapp.appspot.com',
  messagingSenderId: '833656695897'
}
firebase.initializeApp(config)

export default firebase
