import {DocumentReference} from '@angular/fire/firestore';
export interface Transfer {
  issue_id: number;
  date_due: string;
  renewals: number;
  title: string;
  issuedate: string;
  status?: string;
  sender?: string;
  receiver?: string;
  docRef?: DocumentReference;
}
