import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OverallInfoService {
  constructor(private afs: AngularFirestore) {}

  /**
   * Retrieve feedbacks sent by the library users
   */
  getFeedbacks = () => {
    return this.afs.collection('feedback');
  };

  /**
   * Get book requests
   */
  getBookRequests = () => {
    return this.afs.doc('users/{userID}/requests');
  };
}
