import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Feedback} from 'app/models/Feedbak';
import {map, tap} from 'rxjs/operators';
import '@firebase/firestore';

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
              creationDate: Date(creationDate)
            };
          });
        })
      );
  };

  /**
   * Get book requests
   */
  getBookRequests = () => {
    return this.afs.doc('users/{userID}/requests');
  };

  /**
   * Get paid penalty payments
   */
  getPenaltyPayments = () => {
    return this.afs.doc('users/{userID}/penalties');
  };
}
