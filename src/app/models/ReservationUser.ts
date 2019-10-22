import * as firebase from 'firebase/app';

export interface ReservationUser {
  uid: string;
  date: firebase.firestore.Timestamp;
  cardNumber: string;
}
