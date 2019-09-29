import {DocumentReference} from '@angular/fire/firestore';

export interface BookRequest {
  title: string;
  authors: Array<String>;
  ISBN: string;
  description: string;
  file?: {
    imageURL: string;
  };
  docRef?: DocumentReference;
}
