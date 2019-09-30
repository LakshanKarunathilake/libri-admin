import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Feedback} from 'app/models/Feedbak';
import {map, tap} from 'rxjs/operators';
import '@firebase/firestore';
import {BookRequest} from 'app/models/BookRequest';

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
}
