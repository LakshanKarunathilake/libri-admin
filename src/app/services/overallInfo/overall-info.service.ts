import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Feedback} from 'app/models/Feedbak';
import {map, tap} from 'rxjs/operators';
import '@firebase/firestore';
import {BookRequest} from 'app/models/BookRequest';
import {Transfer} from 'app/models/Transfer';
import {Counter} from 'app/models/Counter';

@Injectable({
  providedIn: 'root'
})
export class OverallInfoService {
  constructor(private afs: AngularFirestore) {}

  /**
   * Retrieve feedbacks sent by the library users
   * @returns { Observable }
   */
  getFeedbacks = () => {
    return this.afs
      .collection('Feedback')
      .valueChanges()
      .pipe(
        map(data => {
          return data.map(({message, type, creationDate}: Feedback) => {
            return {
              message,
              type,
              creationDate: new Date(creationDate['seconds'])
            };
          });
        })
      );
  };

  /**
   * Get book requests
   */
  getBookRequests = () => {
    return this.afs
      .collectionGroup<BookRequest>('requests')
      .snapshotChanges()
      .pipe(
        map(data =>
          data.map(val => {
            const info = val.payload.doc.data();
            const docRef = val.payload.doc.ref;
            return {docRef, ...info};
          })
        )
      );
  };

  /**
   * Get paid penalty payments
   */
  getPenaltyPayments = () => {
    return this.afs.collection('users/{userID}/penalties');
  };

  /**
   * Obtain transfer attempts by users
   * Some attempts can be successfull attempts where two users participate and officials only need to accept it
   */
  getTransferRequests = () => {
    return this.afs
      .collectionGroup<Transfer>('transfers')
      .snapshotChanges()
      .pipe(
        map(data =>
          data.map(val => {
            const info = val.payload.doc.data();
            const docRef = val.payload.doc.ref;
            return {docRef, ...info};
          })
        )
      );
  };

  getCounter = counterName => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    console.log('date', date);
    const formatted_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log('formatted_date', formatted_date);
    return this.afs
      .collection('admin')
      .doc('counters')
      .collection(counterName)
      .doc<Counter>(formatted_date)
      .valueChanges()
      .pipe(
        map(val => {
          if (val) {
            return val.count;
          }
          return 0;
        })
      );
  };
}
